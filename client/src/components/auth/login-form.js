// Vendor libs
import React, { useState } from 'react';

// Custom libs
import { getI18nProps, withI18n } from '../../libs/i18n';

// Component definition
const LoginForm = ({ onFormSuccess }) => {
  // Component state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  function onFormSuccessHandler(e) {
    e.preventDefault();
    onFormSuccess({ email, password, rememberMe });
  }

  return (
    <form onSubmit={(e) => onFormSuccessHandler(e)}>
      <span>Login form</span>

      <div>
        <input
          placeholer='email'
          name='email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholer='password'
          name='password'
          type='password'
          autoComplete='current password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <input type='checkbox' onChange={(e) => setRememberMe(!rememberMe)} />
      </div>

      <div>
        <button type='submit'>Entrar</button>
      </div>
    </form>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const trans = await getI18nProps(ctx, ['common', 'auth']);

  return { props: { ...trans }, revalidate: 1 };
}

export default withI18n(LoginForm);
