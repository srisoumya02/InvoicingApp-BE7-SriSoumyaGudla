from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponseBadRequest
from .data import invoicedata,userdata
from .serializers import InvoiceSerlializer,ItemSerializer,UserSerilaizer
import json

# Create your views here.
all_items=[]

class InvoiceView(View):
    #Retrieve a list of all invoices for the Invoice List Page
    def get(self, request, id=None):
        if id == None:
          serialized_data=InvoiceSerlializer(invoicedata,many=True).data
          return JsonResponse(serialized_data, safe=False)
        else:
    #Retrieve a specific invoice's information by its ID for the detailed view
          serialized_data=InvoiceSerlializer(invoicedata,many=True).data
          for index, item in enumerate(serialized_data):
              if(item["invoice_id"]== id):
                   return JsonResponse(item,safe=False)
              
          return HttpResponseBadRequest
    
    #create new invoice
    def post(self,request):
          invoice_data=json.loads(request.body)
          invoice_data["invoice_id"]=len(invoicedata)+1
          #validate data using serilaizer
          invoice_serialized=InvoiceSerlializer(data=invoice_data)
          if (invoice_serialized.is_valid()):
            invoicedata.append(invoice_serialized.data)

            return JsonResponse(invoice_serialized.data,safe=False, status=201)
          else:
            return HttpResponseBadRequest()
          
class ItemNew(View):
    def post(self, request, id):
        # Load the request body as JSON
        item_data = json.loads(request.body)
        # Find the invoice in invoicedata based on the given id
        invoice_found = None
        for invoice in invoicedata:
            if invoice["invoice_id"] == id:
                invoice_found = invoice
                break
        if invoice_found:
            # Get the items from the invoice or initialize an empty list
            items = invoice_found.get("items", [])
            # Add a new item_id to the item_data
            item_data["item_id"] = len(items) + 1
            # Create an ItemSerializer instance
            item_serializer = ItemSerializer(data=item_data)
            # Check if the item data is valid
            if item_serializer.is_valid():
                # Append the new item to the items list
                items.append(item_serializer.data)
                # Update the items in the original invoicedata
                invoice_found["items"] = items
                # Return the serialized data of the newly created item
                return JsonResponse(item_serializer.data, safe=False, status=201)
            else:
                return HttpResponseBadRequest("Invalid item data")
        else:
            return HttpResponseBadRequest("Invoice not found")

class UserSignUp(View):
    def post(self, request):
        user_data = json.loads(request.body)
        user_data["user_id"] = len(userdata) + 1

        user_serialized = UserSerilaizer(data=user_data)
        if user_serialized.is_valid():
            # Assuming user_data is a list
            userdata.append(user_serialized.data)
            return JsonResponse(user_serialized.data, status=201)
        else:
            return HttpResponseBadRequest()

class UserSignIn(View):
    def post(self,request):
        user_data=json.loads(request.body)
        for index,item in enumerate(userdata):
            if(item["email"] == user_data["email"] and item["password"] == user_data["password"]):
                return JsonResponse({"message": "User is logged in successfully"}, safe=False,status=200)
        
        return JsonResponse({"error": "Invalid email or password"}, status=400)