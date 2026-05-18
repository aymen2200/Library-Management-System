const LoginSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:3000/user/login", {
            email,
            password,
            role,
        });

        if (res.data.success) {
            UserInfo(res.data.user.name, res.data.user.email, res.data.token);
            setEmail("");
            setPassword("");
            login();
        }

    } catch (err) {
        console.log("Login failed", err.response?.data);
    }
};


const RegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:3000/user/register", {
            name,
            email,
            password,
        });

        if (res.data.success) {
            UserInfo(name, email, res.data.token)
            setName("");
            setEmail("");
            setPassword("");
            localStorage.setItem("token", res.data.token);
            login();
        }

    } catch (err) {
        console.log("Login failed", err.response?.data);
    }
};

