const useFetchContact = () => {
  const createContact = async (data) => {
    try {
      const response = await fetch("http://localhost:3042/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Fejl ved oprettelse af besked");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      throw error;
    }
  };
  return {
    createContact,
  };
};

export { useFetchContact };
