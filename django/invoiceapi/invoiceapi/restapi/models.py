from django.db import models

# Create your models here.
class Invoice(models.Model):
    invoice_id = models.IntegerField()
    client_name=models.CharField(max_length=200)
    date=models.DateField()
   
    

class Items(models.Model):
    invoice=models.ForeignKey(Invoice, on_delete=models.CASCADE,related_name="items")
    item_id = models.IntegerField()
    desc=models.TextField()
    quantity=models.IntegerField()
    rate=models.DecimalField(max_digits=10,decimal_places=2)

class User(models.Model):
    user_id=models.IntegerField()
    name=models.CharField(max_length=200)
    email=models.EmailField(max_length=200)
    password=models.CharField(max_length=200)
