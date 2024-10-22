void main()
{
    print("aa");

    var age = 23;
    final double height = 1.85;
    const String name = "Charles";

    print("Name: " + name);

    Car c = Car("fiat", "purple");
    c.show_info();

    List<String> fruits = ['aa', 'bb'];

}

class Car

{

    String model, color;
    Car(this.model, this.color);

    void show_info()
    {
        print('Modelo: $model, color: $color');
    }
}