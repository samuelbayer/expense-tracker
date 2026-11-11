const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
})



// Texto que escribe el usuario -> céntimos (entero). Devuelve null si no es válido.
export function toCents(input: string): number | null {

  const regex = /^\d+([.,]\d{1,2})?$/;
  if (!regex.test(input.trim())) {
    return null
  }
  const textWithPoint = input.trim().replace(',', '.');
  
  return Math.round(Number((textWithPoint).trim()) * 100)
 }

// Céntimos -> texto para mostrar, por ejemplo "12,50 €"
export function formatCurrency(cents: number): string {
  
  return `${formatter.format(cents / 100)}`
 }