# User-Base App
***
First, make sure you have Node.js, NPM, Angular 17.3.0, Docker Desktop, Java, and Maven installed.

- You can install Node and NPM from here: [Node.js](https://nodejs.org/en/download/package-manager)
- You can install Java from here: [Java](https://www.oracle.com/java/technologies/javase-downloads.html)
- You can install Maven from here: [Maven](https://maven.apache.org/install.html/en/download/package-manager)

After installing everything successfully do the following:
### **Angular installation**
```bash
npm install -g @angular/cli@17.3.0
```
```bash
cd User-Base\Registration-Front
```
```bash
ng serve --o
```
***

### **MySQL Database**
  ```bash
   docker pull mysql
   ```
   ```bash
   docker run --name some-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123 -d mysql:latest
   ```
   ```bash
   docker exec -it some-mysql mysql -uroot -p
   ```
```bash
CREATE DATABASE user_registration;
```
After this is done run the SQL provided in the resources/sql directory.
***
### Java-Maven Setup
Make sure to correctly install both Java and Maven and set them in System Variables. 
```bash
cd User-Base\Registration-Back
```
```bash
mvn clean compile
```
```bash
mvn spring-boot:run
```
***
#### Project made by [Nikoloz Melashvili](https://www.linkedin.com/in/nikoloz-melashvili/)