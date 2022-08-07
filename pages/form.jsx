import Head from 'next/head'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'



const Form = () => {

  const [sending, setSending] = useState(false)

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDOB] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [attachment, setAttachment] = useState('')

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    // source: https://stackoverflow.com/a/52311051
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
          if ((encoded.length % 4) > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4))
          }
          resolve(encoded)
        }
        reader.onerror = error => reject(error)
      })
    }
    // source: https://stackoverflow.com/a/52311051

    getBase64(attachment).then((base64content)=> {
      const form = {
        firstname,
        lastname,
        email,
        dob,
        subject,
        body,
        attachments: [{
          filename: attachment.name,
          type: attachment.type,
          content: base64content,
          content_id: 'cv',
          disposition: 'attachment'
        }]
      }
      fetch('/api/form', {
        method: 'POST',
        body: JSON.stringify(form)
      })
      .then((res) => {
        router.reload('/form')
      })
      .catch((err) => alert('Error'))
    })
  }



  return (

    <>

      <Head>
        <title>Form</title>
        <meta name="description" content="Form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-4xl mx-auto p-20">
        <form className="flex flex-col gap-5">
          <div className="form-item flex flex-row flex-wrap my-2">
            <label className="md:w-1/4 md:text-right p-2" htmlFor="firstname">First name:</label>
            <input
              className="bg-gray-700 md:w-3/4 p-2"
              type="text"
              id="firstname"
              name="firstname"
              placeholder=""
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-item flex flex-row flex-wrap my-2">
            <label className="md:w-1/4 md:text-right p-2" htmlFor="lastname">Last name:</label>
            <input
              className="bg-gray-700 md:w-3/4 p-2"
              type="text"
              id="lastname"
              name="lastname"
              placeholder=""
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-item flex flex-row flex-wrap my-2">
            <label className="md:w-1/4 md:text-right p-2" htmlFor="email">Email:</label>
            <input
              className="bg-gray-700 md:w-3/4 p-2"
              type="email"
              id="email"
              name="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-item flex flex-row flex-wrap my-2">
            <label className="md:w-1/4 md:text-right p-2" htmlFor="dob">DOB:</label>
            <input
              className="bg-gray-700 md:w-3/4 p-2"
              type="date"
              id="dob"
              name="dob"
              defaultValue={dob}
              onChange={(e) => setDOB(new Date(e.target.value).toLocaleDateString())}
              required
            />
          </div>
          <div className="form-item flex flex-row flex-wrap my-2">
            <label className="md:w-1/4 md:text-right p-2" htmlFor="subject">Subject:</label>
            <input
              className="bg-gray-700 md:w-3/4 p-2"
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-item flex flex-row flex-wrap my-2">
            <label className="md:w-1/4 md:text-right p-2" htmlFor="body">Body:</label>
            <textarea
              className="bg-gray-700 md:w-3/4 p-2"
              rows="6"
              id="body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="form-item flex flex-row flex-wrap my-2">
            <label className="md:w-1/4 md:text-right p-2" htmlFor="attachment">Attachment:</label>
            <input
              className="bg-gray-700 md:w-3/4 p-2"
              type="file"
              id="attachment"
              name="attachment"
              // value={attachment}
              multiple={false}
              onChange={(e) => setAttachment(e.target.files[0])}
              accept=".txt,.rtf,.doc,.docx,.pdf"
              required
            />
          </div>
          <div className="form-item flex flex-row flex-wrap justify-end my-2">
            { !sending && (
              <input
                className="bg-slate-300 text-gray-700 dark:bg-slate-700 dark:text-gray-300 cursor-pointer md:w-3/4 p-2"
                type="submit"
                value="Submit"
                onClick={(e)=>{handleSubmit(e)}}
              />
            )}
            { sending && (
              <input
                className="bg-slate-400 text-gray-600 dark:bg-slate-600 dark:text-gray-400 cursor-wait md:w-3/4 p-2"
                type="submit"
                value="Submit"
                disabled
              />
            )}
           
          </div>
        </form>
      </main>

      <footer></footer>

    </>

  )

}

export default Form
