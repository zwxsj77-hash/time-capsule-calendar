import { useState } from 'react';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    const dateKey = selectedDate.toDateString();
    const newEntries = { ...entries, [dateKey]: { title, message } };
    setEntries(newEntries);
    localStorage.setItem('timeCapsuleEntries', JSON.stringify(newEntries));
    setTitle('');
    setMessage('');
  };

  const loadSavedEntries = () => {
    const saved = localStorage.getItem('timeCapsuleEntries');
    if (saved) setEntries(JSON.parse(saved));
  };

  useState(loadSavedEntries, []);

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h1>📆 小日历时间胶囊</h1>
      <input
        type=\"date\"
        value={selectedDate.toISOString().substring(0, 10)}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        style={{ width: '100%', margin: '12px 0', padding: '8px' }}
      />
      <input
        placeholder=\"标题（可选）\"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 8, padding: '8px' }}
      />
      <textarea
        placeholder=\"写下你想对未来说的话...\"\"
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '100%', marginBottom: 8, padding: '8px' }}
      />
      <button onClick={handleSave} style={{ padding: '8px 16px' }}>
        保存到时间胶囊
      </button>

      {Object.keys(entries).length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2>📜 我的时间胶囊记录：</h2>
          {Object.entries(entries).map(([date, { title, message }]) => (
            <div
              key={date}
              style={{
                border: '1px solid #ccc',
                padding: 12,
                marginTop: 12,
                borderRadius: 8,
              }}
            >
              <strong>{date}</strong>
              {title && <div><em>{title}</em></div>}
              <div style={{ whiteSpace: 'pre-wrap' }}>{message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
