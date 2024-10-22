from main import *

class Car(Auto):
    
    def Roar(self):
        
        print("the model is: {}".format(self.model))
    
    
car = Car("Honda", "aa")
car.Roar()