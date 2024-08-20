import 'bootstrap/dist/css/bootstrap.css'
import Titulo from '@/components/Titulo'

export const metadata = {
  title: 'Escalante',
  description: 'Sistema de controle de horarios Escalente',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">  
    <head>
      <link rel="shortcut icon" href="../s.png" type="image/x-icon" />  
    </head>    
      <body>
        <Titulo />
        {children}
      </body>
    </html>
  )
}
