import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../apiConfig'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (newPassword.length < 6) {
      setIsError(true)
      setMessage('Password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setIsError(true)
      setMessage('Passwords do not match.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      })
      const result = await response.json()

      if (result.error) {
        setIsError(true)
        setMessage(result.error)
      } else {
        setIsError(false)
        setMessage(result.message)
        setDone(true)
        setTimeout(() => navigate('/profile'), 3000)
      }
    } catch (err) {
      setIsError(true)
      setMessage('Server error. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card futuristic" style={{ maxWidth: '420px' }}>

        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔒</div>
          <h2 style={{ margin: 0, color: '#A1673F' }}>Reset Password</h2>
          <p style={{ fontSize: '13px', color: '#aaa', marginTop: '6px' }}>
            {token ? 'Choose a strong new password.' : 'Invalid or missing reset token.'}
          </p>
        </div>

        {!token ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#e74c3c', marginBottom: '16px' }}>
              ❌ This reset link is invalid. Please request a new one.
            </p>
            <button onClick={() => navigate('/profile')}>Go to Sign In</button>
          </div>
        ) : done ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#2ecc71', fontSize: '15px', marginBottom: '10px' }}>
              ✅ {message}
            </p>
            <p style={{ color: '#aaa', fontSize: '13px' }}>Redirecting to Sign In...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <input
                id="reset-new-password"
                type="password"
                placeholder="New Password (min 6 chars)"
                required
                minLength={6}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                id="reset-confirm-password"
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  borderColor: confirmPassword && confirmPassword !== newPassword ? '#e74c3c' : ''
                }}
              />
              {confirmPassword && confirmPassword !== newPassword && (
                <span style={{ fontSize: '12px', color: '#e74c3c' }}>Passwords don't match</span>
              )}
            </div>

            {message && (
              <p style={{
                textAlign: 'center',
                fontSize: '13px',
                color: isError ? '#e74c3c' : '#2ecc71',
                marginBottom: '12px'
              }}>
                {isError ? '❌ ' : '✅ '}{message}
              </p>
            )}

            <button
              id="reset-password-submit"
              type="submit"
              disabled={loading}
              style={{ width: '100%', marginTop: '4px' }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: '#aaa' }}>
              <span
                style={{ color: '#A1673F', cursor: 'pointer' }}
                onClick={() => navigate('/profile')}
              >
                ← Back to Sign In
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
