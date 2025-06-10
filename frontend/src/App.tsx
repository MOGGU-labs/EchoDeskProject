import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Replace with your backend endpoint
    fetch('http://localhost:3000/clients')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        // If your data is wrapped in a "data" field, use data.data
        setRecords(data.data || data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch records')
        setLoading(false)
      })
  }, [])

  // Helper to get the latest updated folder object
  const getLatestFolder = (folders: any[] = []) => {
    if (!folders.length) return null
    const latest = [...folders].sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0]
    return latest
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <h2>Client Records</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li className="client-header">
          <span className="client-col">Client </span>
          <span className="client-col">Latest Folder</span>
          <span className="client-col">Author</span>
          <span className="client-col">Updated</span>
        </li>
        {records.map((record) => {
          const latestFolder = getLatestFolder(record.folders)
          return (
            <li key={record.id} className="client-row">
              <span className="client-col">
                <strong>{record.clientCode}</strong>: {record.name}
              </span>
              <span className="client-col">
                {latestFolder ? latestFolder.title : 'No folders'}
              </span>
              <span className="client-col">
                {latestFolder && latestFolder.createdBy
                  ? latestFolder.createdBy.fullName
                  : 'N/A'}
              </span>
              <span className="client-col">
                {latestFolder
                  ? new Date(latestFolder.updatedAt).toLocaleString()
                  : 'N/A'}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
