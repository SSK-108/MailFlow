import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [emailData, setEmailData] = useState({
    recipientEmail: "",
    subject: "",
    message: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleEmailSend = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      if (response.ok) {
        alert('Email sent successfully');
      } else {
        alert('Error sending email');
      }
    } catch (error) {
      alert('Error sending email');
    }
  };


  return (
    <div className=" w-screen h-screen bg-lime-300">
      <h1 className="text-5xl font-bold bg-emerald-300 text-green-900 py-5 flex justify-center items-center">
        Email Sender
      </h1>
      <div className="p-3 flex gap-5 justify-center items-center w-full text-lg bg-lime-300">
        <label className="font-semibold">Upload CSV:</label>
        <input
          className="rounded font-semibold"
          type="file"
          onChange={handleFileChange}
        />
        <button
          className="font-semibold border-dashed border-emerald-900 border-4 text-xl bg-emerald-400 hover:ease-in hover:bg-emerald-200 rounded-lg px-5 py-3 text-emerald-900 text-semibold"
          onClick={handleFileUpload}
        >
          Upload File
        </button>
      </div>
      <div className="w-full bg-lime-300">
        <h2 className="text-green-900 place-content-center p-3 text-3xl font-bold">
          Send Email
        </h2>
        <div className="flex p-2 px-9 gap-4 align-center flex-col justify-center">
          <input
            className="w-1/3 border-double border-4 border-sky-500 rounded-lg bg-emerald-100 px-4 py-2 text-xl"
            type="email"
            name="recipientEmail"
            placeholder="Recipient Email"
            value={emailData.recipientEmail}
            onChange={handleInputChange}
          />
          <input
            className="w-1/3 border-double border-4 border-sky-500 rounded-lg bg-emerald-100 px-4 py-2 text-xl"
            type="text"
            name="subject"
            placeholder="Subject"
            value={emailData.subject}
            onChange={handleInputChange}
          />
          <textarea
            className="w-1/3 border-double border-4 border-sky-500 rounded-lg bg-emerald-100 px-4 py-2 text-xl"
            name="message"
            placeholder="Message"
            value={emailData.message}
            onChange={handleInputChange}
          ></textarea>
          <button
            className="bg-emerald-500 p-3 font-semibold rounded-xl hover:bg-emerald-200 text-lg w-1/5"
            onClick={handleEmailSend}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
