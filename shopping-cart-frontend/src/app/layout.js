import "bootstrap/dist/css/bootstrap.min.css"
// import { config } from '@fortawesome/fontawesome-svg-core'
// import './fontawesome.css'
// config.autoAddCss = false

import BootstrapClient from '../components/BootstrapClient.js';

export const metadata = {
  title: 'Shopping Cart',
  description: 'Web site created with Next.js.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      </head>
      <body>
        <div id="root">{children}</div>
        <BootstrapClient />
      </body>
    </html>
  );
}