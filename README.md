This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Para iniciar la app: ###

__mysql__
- en /config/database.yml
  cambiar username y password a su propia configuración de mysql DB
- `$ mysqld`

__react-app__(`cal-in/client`)

- `$ npm i`

__ruby api__(`cal-in`)

- `$ gem install foreman`
- `$ bundle install`
- `$ foreman start`


## Retrospectiva del FRONTEND ##

	A manera de referencia y transparencia, he dejado las distintas branches creadas para desarrollar las distintas features y fixes a lo largo de estas dos semanas.

	He utilizado el componente react-big-calendar pues es el que me permitía añadir eventos en sus días. He comenzado la app desarrollando la lista e items a su lado.

	En la app react he podido implementar mobx, lo he hecho en base a la documentación, al video explicativo en egghead, distintos artículos y ejemplos encontrados en github.

	La implementación de mobx-rest fue un poco más complicada de realizar por lo que preferí continuar y mejorar mi implementación de mobx, siguendo mejores patrones como observable maps en lugar de observable arrays para el store, así como una mejor implementacion de la api.

	Ha faltado implementación de chequeo de types con flow o proptyes y de tests.