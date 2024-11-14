import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [emailData, setEmailData] = useState({
    recipientEmail: '',
    subject: '',
    message: ''
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleEmailSend = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className=' w-full h-full'>
      <h1 className='text-5xl font-bold bg-emerald-300 text-green-900 py-5 flex justify-center items-center'>Email Sender</h1>
      <div className='p-3 flex gap-5 justify-center items-center w-full bg-amber-200'>
        <label className='font-semibold'>Upload CSV:</label>
        <input className='rounded font-semibold' type="file" onChange={handleFileChange} />
        <button className='font-semibold text-xl bg-emerald-400 hover:ease-in hover:bg-emerald-200 rounded px-5 py-3 text-emerald-900 text-semibold' onClick={handleFileUpload}>Upload File</button>
      </div>
      <div className='w-full bg-lime-200'>
        <h2>Send Email</h2>
        <input
          type="email"
          name="recipientEmail"
          placeholder="Recipient Email"
          value={emailData.recipientEmail}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleInputChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={emailData.message}
          onChange={handleInputChange}
        ></textarea>
        <button onClick={handleEmailSend}>Send Email</button>
      </div>
    </div>
  );
}

export default App;
