from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import User, ShopData, AdminUser
from django.http import JsonResponse
from django.forms.models import model_to_dict
import json
# Create your views here.
def getUser(request, email, password):
    try:
        user = get_object_or_404(User, email = email)
        if user.password == password:
            data = {
                'email': user.email,
                'password': user.password
            }
        else:
            data = {
                'email': user.email,
                'password': ''
            }
    except:
        data = {
                'email': '',
                'password': ''
            }
    return  JsonResponse(data)

def getAdminUser(request):
    userInfor = json.loads(request.body.decode('utf-8'))
    username = userInfor['username']
    print(username)
    user = AdminUser.objects.filter(user_name = username)
    if user:
      try:
          user = get_object_or_404(AdminUser, user_name = username)
          if  user.password == userInfor['password']:
              data = {
                'user_name': user.user_name,
                'password': user.password
              }
          else:
            data = {
              'user_name': user.user_name,
              'password': ''
            }
      except:
        data = {
          'user_name': '',
          'password': ''
        }
    else:
      data = {
        'user_name': '',
        'password': ''
      }

    return  JsonResponse(data)

def getAdminUsers(request):
  users = AdminUser.objects.all()
  user_list = []
  for user in users:
    item = model_to_dict(user)
    user_list.append(item)

  return JsonResponse(user_list, safe=False)

def addUser(request):
    try:
        User.objects.create(
            name = request.POST['name'],
            email = request.POST['email'],
            password = request.POST['password'],
            age = request.POST['age'],
            gender = request.POST['gender'],
        )
        data = {"success": "true" }
    except:
        data = {"success": "false"}

    return JsonResponse(data)

def addAdminUser(request):
    if request.method == "POST":
        details = json.loads(request.body.decode('utf-8'))
    try:
        AdminUser.objects.create(
            first_name = details['firstName'],
            last_name = details['lastName'],
            password = details['password'],
            user_name = details['username']
        )
        data = {"success": "true" }
    except:
        data = {"success": "false" }


    return JsonResponse(data)

def manageShopData(request):
    print(request.POST.get('title'))
    # try:
    ShopData.objects.create(
        store_name = request.POST.get('title'),
        store_picture = request.FILES['cover'],
    )
    # data = {"success": "true" }
    # except:
        # data = {"success": "false"}

    # return JsonResponse(data)
    # cover = request.data['cover']
    # title = request.data['title']
    # return HttpResponse({'message': 'Image Upload'}, status=200)
    return HttpResponse('success')

def home(request): 
    return HttpResponse('Hello, ShopVote!')
    
def deleteAdminUser(request, id):
  print(id)
  user = AdminUser.objects.get(id = id)
  if user:
    user.delete()
    return JsonResponse({'success': 'true'})
  else:
    return JsonResponse({'success': 'false'})

def getShopDatas(request):
  shopDatas = ShopData.objects.all()
  shop_list = []
  for shopData in shopDatas:
    item = model_to_dict(shopData)
    if (item.get('store_picture')):
        item['store_picture'] = str(item.get('store_picture'))
        print(item)

    shop_list.append(item)

  return JsonResponse(shop_list, safe=False)

