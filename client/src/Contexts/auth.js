import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [establishment, setEstablishment] = useState();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user_token"));
    const establishmentToken = JSON.parse(localStorage.getItem("establishment_token"));
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    const establishmentsStorage = JSON.parse(localStorage.getItem("establishment_bd"));

    if (userToken && usersStorage) {
      const hasUser = usersStorage.find(
        (user) => user.email === userToken.email
      );
  
      if (hasUser) {
        setUser(hasUser);
      } else {
        // Limpar token se o usuário não for encontrado
        localStorage.removeItem("user_token");
      }
    }
  
    if (establishmentToken && establishmentsStorage) {
      const hasEstablishment = establishmentsStorage.find(
        (establishment) => establishment.email === establishmentToken.email
      );
  
      if (hasEstablishment) {
        setEstablishment(hasEstablishment);
      } else {
        // Limpar token se o estabelecimento não for encontrado
        localStorage.removeItem("establishment_token");
      }
    }
  }, []);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        const expirationTime = 60 * 60 * 1000; // 1 hora em milissegundos
        const tokenExpiration = new Date().getTime() + expirationTime;

        localStorage.setItem("user_token", JSON.stringify({ email, token, expiration: tokenExpiration }));
        setUser({ email, password });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (email, password, nome, enderecoUser, telefone) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password, nome, enderecoUser, telefone }];
    } else {
      newUser = [{ email, password, nome, enderecoUser, telefone }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  const updateUser = (email, newEnderecoUser, newTelefone, newNomeUser) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
  
    const updateUsers = usersStorage.map((user) => {
      if (user.email === email) {
        return {
          ...user,
          enderecoUser: newEnderecoUser,
          telefone: newTelefone,
          nome: newNomeUser
        };
      }
      return establishment;
    });
  
    localStorage.setItem("users_bd", JSON.stringify(updateUsers));
  };

  const getUserData = () => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    return usersStorage && usersStorage.length > 0 ? usersStorage[0] : null;
  };

  const signinEstablishment = (email, password) => {
    const establishmentsStorage = JSON.parse(localStorage.getItem("establishment_bd"));

    const hasUser = establishmentsStorage?.filter((establishment) => establishment.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("establishment_token", JSON.stringify({ email, token }));
        setEstablishment({ email, password });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signupEstablishment = (email, password, nomeEstabelecimento, enderecoEstabelecimento) => {
    const establishmentsStorage = JSON.parse(localStorage.getItem("establishment_bd"));

    const hasUser = establishmentsStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (establishmentsStorage) {
      newUser = [...establishmentsStorage, { email, password, nomeEstabelecimento, enderecoEstabelecimento }];
    } else {
      newUser = [{ email, password, nomeEstabelecimento, enderecoEstabelecimento }];
    }

    localStorage.setItem("establishment_bd", JSON.stringify(newUser));

    return;
  };

  const signoutEstablishment = () => {
    setEstablishment(null);
    localStorage.removeItem("establishment_token");
  };

  const updateEstablishment = (email, newPassword, newNomeEstabelecimento, newEnderecoEstabelecimento) => {
    const establishmentsStorage = JSON.parse(localStorage.getItem("establishment_bd"));
  
    const updatedEstablishments = establishmentsStorage.map((establishment) => {
      if (establishment.email === email) {
        return {
          ...establishment,
          nomeEstabelecimento: newNomeEstabelecimento,
          enderecoEstabelecimento: newEnderecoEstabelecimento,
        };
      }
      return establishment;
    });
  
    localStorage.setItem("establishment_bd", JSON.stringify(updatedEstablishments));
  };

  const getEstablishmentData = () => {
    const establishmentStorage = JSON.parse(localStorage.getItem("establishment_bd"));
    return establishmentStorage && establishmentStorage.length > 0 ? establishmentStorage[0] : null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        establishment,
        signed: !!user || !!establishment,
        signin,
        signup,
        signout,
        signinEstablishment,
        signupEstablishment,
        signoutEstablishment,
        updateEstablishment,
        getEstablishmentData,
        updateUser,
        getUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};