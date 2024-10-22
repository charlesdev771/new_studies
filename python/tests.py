def decorador(funcao):
    def funcao_decorada():
        print("Algo antes da função.")
        funcao()
        print("Algo depois da função.")
    return funcao_decorada

@decorador
def saudacao():
    print("Olá!")

saudacao()