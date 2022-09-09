# Desafio Softfocus Python e Javascript

- Criar um CRUD para comunicação de perda (Django + React)

## Requisitos

1. Desenvolver solução em Python ✔️
2. Interface criada em HTML ✔️
3. Possibilita cadastro, visualização, atualização e exclusão de uma comunicação de perda ✔️
4. Dados devem ser salvos em um banco de dados (MySQL escolhido) ✔️
5. Adicionar campos para informações do produtor/evento de perda ✔️
6. Validações para garantir veracidade do evento informado ✔️
7. Validações para CPF e e-mail ✔️
8. Criar busca de comunicação por CPF ✔️
 
## Linguagens e Ferramentas:

<a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="30" height="30"/> </a>
React
</br>
</br>
<a href="https://www.djangoproject.com/" target="_blank"> <img src="https://d1wrxu8gicsgam.cloudfront.net/wp-content/files/django-logo-big.jpg" alt="django" width="30" height="30"/> </a>
Django
</br>

## Iniciando o projeto

<details>
  <summary><strong> Instalando localmente </strong></summary>
  </br>
  
  - Abra o terminal e crie um diretório em um local de preferência:
  ```sh
  $ mkdir <Nome do diretório>
  ```
  
  - Acesse o diretório e então clone o repositório:
  ```sh
  $ cd <Nome do diretório>
  $ git clone git@github.com:ViniGB/django-react-challenge.git
  ```
  
  - Instalações foram rodadas em ambiente virtual. Caso deseje instalar pacotes extras em ambiente virtual:
  ```sh
  $ python3 -m venv <nome do ambiente aqui> (mac/unix)
  $ py -m venv <nome do ambiente aqui> (windows)
  ```
  - Acessar ambiente virtual:
  ```sh
  $ source <nome do ambiente aqui>/bin/activate (mac/unix)
  $ <nome do ambiente aqui>\env\Scripts\activate (windows)
  ```
  - Para desativar:
  ```sh
  $ deactivate
  ```
  
  - Acesse o diretório do projeto:
  ```sh
  $ cd django-react-challenge
  ```
  
  - Conectando ao banco de dados MySQL:
  
    . Garanta que o banco de dados está rodando na sua máquina
  ```sh
  $ sudo systemctl status mysql
  ```
  
    . Caso não
  
  ```sh
  $ sudo systemctl start mysql
  ```
  
    . Conecte ao banco pelo workbench e crie o banco de dados
  
  ```sh
  $ CREATE DATABASE  IF NOT EXISTS `Losscomm` ;
  ```
  
    . Em losscom/settings.py, o ambiente já está preparado para conectar ao banco de dados, bastante adicionar a senha do seu usuário root, em:
    DATABASE = {
      'default': {
        'PASSWORD': # adicionar senha aqui
      }
    }
    
  - Na raíz do projeto, depois de conectar com o banco, faça as migrations:
  ```sh
  $ python manage.py makemigrations
  $ python manage.py migrate
  ```
  
  - Acesse o frontend:
  ```sh
  $ cd frontend
  ```
  
  - Instale as dependências e faça o build:
  ```sh
  $ npm install
  $ npm run build
  ```
  
  - Volte para a raíz do projeto:
  ```sh
  $ cd ..
  ```
  
  - O frontend está configurado para rodar junto ao back:
  ```sh
  $ python manage.py runserver
  ```
  
  - Com isso, o frontend estará habilitado na url http://localhost:8000, onde está a interface do CRUD.
</details>
