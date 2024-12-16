import http from "./Http";

export const getCandidates = async () => {
    try {
        const response = await http.get("/get-candidates", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = response.data;

        return { candidates: data.candidates };
    } catch (error) {
        console.log(error);
    }
};

export const createCandidate = async (formData) => {
    try {
        const response = await http.post("/store-candidate", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const data = response.data;

        return {
            success: true,
            message: data.message,
            candidate: data.candidate,
        };
    } catch (error) {
        const errorMessage =
            error.response?.data.message || "An unexpected error occurred.";

        return { success: false, message: errorMessage };
    }
};

export const getSingleCandidate = async (id) => {
    try {
        const response = await http.get(`/get-candidate/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = response.data;

        return {
            candidate: data.candidate,
            success: true,
        };
    } catch (error) {
        const errorMessage =
            error.response?.data.message || "An unexpected error occurred.";

        return { success: false, message: errorMessage };
    }
};

export const updateCandidate = async (id, formData) => {
    try {
        //post because put technically doest not support file upload
        const response = await http.post(`/update-candidate/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const data = response.data;
        return {
            success: true,
            message: data.message,
            candidate: data.candidate,
        };
    } catch (error) {
        const errorMessage =
            error.response?.data.message || "An unexpected error occurred.";

        return { success: false, message: errorMessage };
    }
};

export const deleteCandidate = async (id) => {
    try {
        const response = await http.delete(`/delete-candidate/${id}`);

        const data = response.data;

        return { message: data.message, id: id };
    } catch (error) {
        console.log(error);
    }
};
