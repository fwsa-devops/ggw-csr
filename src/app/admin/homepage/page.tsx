'use client'

import { useEffect, useState } from "react"
import BlockNoteEditor from "./components/blocknote"

const HomePage = () => {

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, [isLoaded])

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <BlockNoteEditor
        editable={true}
        initialContent=""
        onChange={() => { }}
      />
    </>
  )

}

export default HomePage;