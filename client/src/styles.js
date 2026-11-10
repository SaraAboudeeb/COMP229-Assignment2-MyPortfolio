// same styles for all forms, buttons and messages
const styles = {
  page: { padding: '2rem', maxWidth: '500px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '0.5rem' },
  button: { padding: '0.75rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' },
  smallButton: { padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
  deleteButton: { padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: '#b00020', backgroundColor: '#fdecea', padding: '10px', borderRadius: '4px' },
  success: { color: '#1b5e20', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px' },
  loading: { color: '#555', textAlign: 'center' },
  card: { border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '300px' }
};

export default styles;