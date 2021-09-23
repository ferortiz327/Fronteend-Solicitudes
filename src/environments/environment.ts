// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  services: {
    urlBase: "http://localhost:8080/bonita",
     //urlBase: "http://52.136.127.8:8080/bonita",
    post: {
      login: "/loginservice",
      crearCaso: "",
      ejecutarTareaDelDia: "/API/bpm/userTask/"
    },
    get: {
      taskByUser: "/API/bpm/humanTask?f=user_id=",
      getUserDetail: "/API/identity/user?f=userName=",
      getTaskContext: "/API/bpm/userTask/"
    },
    put:{
      asignarTarea:"/API/bpm/humanTask"
    }
  },
  tableConfig: {
    language: {
      url: "../../../assets/json/Spanish.json",
    },
    lengthMenu: [
      [3, 5, 10, 25, 50, -1],
      [3, 5, 10, 25, 50, 'Todos'],
    ],
  }
};
