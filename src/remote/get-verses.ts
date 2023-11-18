export async function fetchVerses (bookId?: string, chapterId?: string) {
  const token = process.env.EXPO_PUBLIC_BIBLE_API
  try {
    if(token) {
      const response = await fetch(
        `https://www.abibliadigital.com.br/api/verses/acf/${bookId || 'gn'}/${chapterId || '1'}`,
        {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'ContentType': 'application/json',
            'Authorization': `Bearer ${token}`
          }),
        }
      )
      const verses = await response.json()
      return verses
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}