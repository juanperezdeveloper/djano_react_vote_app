from django.db import models

class User(models.Model):
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=100,)
    age = models.IntegerField()
    gender = models.CharField(max_length=30,)

class ShopData(models.Model):
    nfc_uid = models.CharField(max_length=100, null=True, blank=True)
    nfc_store_id = models.CharField(max_length=100, null=True, blank=True)
    store_name = models.CharField(max_length=100, null=True, blank=True)
    store_address = models.CharField(max_length=100, null=True, blank=True)
    store_postcode = models.CharField(max_length=100, null=True, blank=True)
    stroe_city = models.CharField(max_length=100, null=True, blank=True)
    store_picture = models.ImageField(max_length=100, null=True, blank=True, upload_to='')
    longtitude = models.CharField(max_length=100, null=True, blank=True)
    latitude = models.CharField(max_length=100, null=True, blank=True)

class AdminUser(models.Model):
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    user_name = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=100, null=True, blank=True)
    