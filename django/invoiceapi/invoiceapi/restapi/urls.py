from django.urls import path
from .views import InvoiceView,ItemNew,UserSignIn,UserSignUp
from django.views.decorators.csrf import csrf_exempt

urlpatterns=[
  path('invoices/',InvoiceView.as_view(), name='invoice-list'),
  path('invoices/<int:id>/',csrf_exempt(InvoiceView.as_view()),name='invoice-detail'),
  path('invoices/new/',csrf_exempt(InvoiceView.as_view()), name='invoice-create'),
  path('invoices/<int:id>/items/',csrf_exempt(ItemNew.as_view()),name='item-create'),
  path('user/signup/',csrf_exempt(UserSignUp.as_view()),name='user-signup'),
  path('user/login/',csrf_exempt(UserSignIn.as_view()),name='user-signin')
]