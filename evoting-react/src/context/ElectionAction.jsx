import http from "./Http";

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const getElections = async () => {
    try {
        const response = await http.get("/get-elections", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = response.data;

        return { elections: data.elections };
    } catch (error) {
        console.log(error);
    }
};

export const createElection = async (formData) => {
    try {
        const response = await http.post("/store-election", formData);

        const data = response.data;

        return {
            success: true,
            message: data.message,
            election: data.election,
        };
    } catch (error) {
        const errorMessage =
            error.response?.data.message || "An unexpected error occurred.";

        return { success: false, message: errorMessage };
    }
};

export const getSingleElection = async (id) => {
    try {
        const response = await http.get(`/get-election/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = response.data;

        return {
            election: data.election,
            success: true,
        };
    } catch (error) {
        const errorMessage =
            error.response?.data.message || "An unexpected error occurred.";

        return { success: false, message: errorMessage };
    }
};

export const updateElection = async (id, formData) => {
    try {
        const response = await http.put(`/update-election/${id}`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = response.data;
        return {
            success: true,
            message: data.message,
            election: data.election,
        };
    } catch (error) {
        const errorMessage =
            error.response?.data.message || "An unexpected error occurred.";

        return { success: false, message: errorMessage };
    }
};

export const deleteElection = async (id) => {
    try {
        const response = await http.delete(`/delete-election/${id}`);

        const data = response.data;

        return { message: data.message, id: id };
    } catch (error) {
        console.log(error);
    }
};
