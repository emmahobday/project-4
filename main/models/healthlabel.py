from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class HealthLabel(models.Model):
  name = models.CharField(max_length=500, null=True)
  user = models.ManyToManyField(User, related_name='health_labels', blank=True)
  
  def __str__(self):
      return f'{self.name}'



# Sugar-Conscious\", \"Vegan\", \"Vegetarian\", \"Peanut-Free\", \"Tree-Nut-Free\", \"Alcohol-Free\