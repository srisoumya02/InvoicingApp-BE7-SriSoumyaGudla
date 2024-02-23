from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# Create your models here.
class Invoice(models.Model):
    invoice_id = models.AutoField (primary_key=True)
    client_name=models.CharField(max_length=200)
    date=models.DateField()
   
    

class Items(models.Model):
    invoice=models.ForeignKey(Invoice, on_delete=models.CASCADE,related_name="items")
    item_id = models.AutoField (primary_key=True)
    desc=models.TextField()
    quantity=models.IntegerField()
    rate=models.FloatField()

# class User(models.Model):
#     user_id=models.IntegerField()
#     name=models.CharField(max_length=200)
#     email=models.EmailField(max_length=200)
#     password=models.CharField(max_length=200)
class UserManager(BaseUserManager):
      def create_user(self, email, password, **extra_fields):

       if not email:
          raise ValueError("email should be provided")
       
       user = self.model(email=email, **extra_fields)
       user.set_password (password)
       user.save()
       return user


      def create_superuser(self, email, password, **extra_fields):
          extra_fields.setdefault('is_staff', True)
          extra_fields.setdefault('is_superuser', True)
          return self.create_user(email, password, **extra_fields)
      
class User(AbstractBaseUser):
      id= models.AutoField (primary_key=True)
      name = models.CharField(max_length=120)
      email = models.CharField (max_length=100,unique=True)
      password = models.CharField (max_length=16)


      USERNAME_FIELD = 'email'

      objects = UserManager()