from django.urls import path
from .views import InvoiceView,ItemNew,SignInView,SignUpView
from django.views.decorators.csrf import csrf_exempt

urlpatterns=[
  path('invoices/',csrf_exempt(InvoiceView.as_view()), name='invoice-list'),
  path('invoices/<int:id>/',csrf_exempt(InvoiceView.as_view()),name='invoice-detail'),
  path('invoices/new/',csrf_exempt(InvoiceView.as_view()), name='invoice-create'),
  path('invoices/<int:id>/items/',csrf_exempt(ItemNew.as_view()),name='item-create'),
  path('signup/',csrf_exempt(SignUpView.as_view()),name='user-signup'),
  path('login/',csrf_exempt(SignInView.as_view()),name='user-signin')
]