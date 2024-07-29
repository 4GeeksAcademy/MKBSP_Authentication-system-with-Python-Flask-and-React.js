const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user: null,
      token: null,
    },
    actions: {
      setUser: (user) => {
        setStore({ user });
      },
      setToken: (token) => {
        setStore({ token });
      },
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          if (!resp.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
          return null; // or throw error if you want to propagate it
        }
      },
      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore({ demo: demo });
      },
      signup: async (email, username, password) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/signup`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, username, password }),
            }
          );

          if (!response.ok) {
            const data = await response.json();
            throw new Error(
              data.message || "An error occurred. Please try again."
            );
          }

          const data = await response.json();
          setStore({ user: data.user });
          return data;
        } catch (error) {
          console.log("Error during signup:", error);
          throw error;
        }
      },
      login: async (email, password) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(
              data.message || "An error occurred. Please try again."
            );
          }

          const data = await response.json();
          setStore({ token: data.token });
          localStorage.setItem("token", data.token);
          return data;
        } catch (error) {
          console.log("Error during login:", error);
          throw error;
        }
      },
    },
  };
};

export default getState;
