import React from 'react'

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthResetPassword from './auth-forms/AuthResetPassword';
import AuthWrapper from './components/AuthWrapper';

const ResetPassword = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Reset Password</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthResetPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default ResetPassword