
open class Animal(var name: String, var age: Int)
{
    fun show_tchau()
    {
        println("Xau :)");
    }
}

class Bob(name: String, age: Int): Animal(name, age)
{


}

data class User(val name: String)

fun main() {

    println("init");
    println("aa");



    val name: String = "Charles";
    var age: Int = 23;

    if (age > 18)
    {
        println("jaaj");
    }
    else
    {
        println("Jooj");
    }

    when (name)
    {
        "Charles" -> println("Charles")
        else -> println("Não Charles :9")
    }

    for (i in 1..100)
    {

        if ( i % 2 == 0)
        {
            println(i);
        }
    }

    var x: Int = 0;

    while(x < 6)
    {
        println(x);
        x++;
    }


    fun show_my_name(name: String): String
    {
        return "My name is: $name";
    }

    var myName = show_my_name("Charles");
    println(myName);

    fun doubleN(x: Int) = x * 2;

    var nameWithNullSafety: String? = null;

    println(nameWithNullSafety?.length);

    val t = nameWithNullSafety?.length ?: 0; //se for nulo será igual a zero.


    val a = Animal("Bob", 4);
    val b = Animal("Bob2", 2);

    a.show_tchau();

    val listaImutavel = listOf(1, 2, 3);
    var listaMutavel = mutableListOf(1, 2, 3);
    listaMutavel.add(4);

    var maP = mapOf("key" to "value");
    var mapMut = mutableMapOf("key" to "Value");


    var user = User("Charles");
    println(user.name);




}