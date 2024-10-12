#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

#define JOOJ 5



void create_menu();
void create_pt_two();


int main(int argc, char *argv[])
{

  //I'am back, baby :)

  /*
  
  Just a comment!
  */

  //create_menu();
  create_pt_two();
  system("PAUSE");
  return 0;

}

void create_pt_two()
{

  char vetor[JOOJ];
  printf("\nDigite aqui o seu nome: ");
  scanf("%s", &vetor);
  printf("\n %s", vetor);

  int var = 11;
  int *pointer;
  int show;

  pointer = &var;
  show = *pointer;
  printf("\n %d", show);




}




void create_menu()
{
      for(int i = 0; i <= 100; i++)
    {
      printf("This is a loop!");
    }
    int number = 0;
    printf("Hello World!\t22222222\v2222222\n");
    char simbolo = 12;
    scanf("%d",  &number);
    scanf("%c",  &simbolo);

    getchar();

    if(number == 15)
    {
        printf("15");
    }
    else if(number > 20)
    {
      printf("20");
    }
    else
    {
      printf("jooooooooj");
    }

    switch(simbolo)
    {
      case 'c':
        printf("\nadadashdbdsbdydby\n\n\n");
      break;
      case 12:
        printf("\n==========================================\n\n\n");
      break;
    }


    inicio:

      printf("\nEste eh o inicio: :)");

    meio:


      printf("\nEste eh o meio: :_");

    fim:

    printf("Este eh o fim: :(");

    int ver = 0;
    while(ver >= 100)
    {
      printf("\nCOme on!");
      scanf("%d",  &ver);
      if(ver % 2) continue;
    }





}