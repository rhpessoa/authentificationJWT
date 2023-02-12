import React from "react";
import { useRouter } from "next/router";
import { authService } from "../src/service/auth/authService";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    usuario: "omariosouto",
    senha: "safepassword",
  });

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          authService
            .login({
              username: values.usuario,
              password: values.senha,
            })
            .then(() => {
              router.push("/auth-page-ssr");
              //router.push("/auth-page-static");
            })
            .catch((err) => {
              alert("Usuário ou a senha estão inválidos");
            });
        }}
      >
        <input
          placeholder="Usuário"
          name="usuario"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={values.senha}
          onChange={handleChange}
        />
        {/* <pre>
          {JSON.stringify(values, null, 2)}
        </pre> */}
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
