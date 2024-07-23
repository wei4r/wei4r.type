import os from "os"
import { promises as fsp } from "fs"
import path from "path"

import { Firestore, FieldValue } from "@google-cloud/firestore"

let _firestore = null

const lazyFirestore = async () => {
  if (!_firestore) {
    const baseDir = await fsp.mkdtemp((await fsp.realpath(os.tmpdir())) + path.sep)
    const fileName = path.join(baseDir, "credentials.json")
    const buffer = Buffer.from(process.env.GOOGLE_CREDENTIALS, "base64")
    await fsp.writeFile(fileName, buffer)

    process.env["GOOGLE_APPLICATION_CREDENTIALS"] = fileName

    _firestore = new Firestore()
  }

  return _firestore
}

export default async (req, res) => {
  const firestore = await lazyFirestore()

  const increment = FieldValue.increment(1)
  const documentRef = firestore.collection("v1").doc("default")

  await documentRef.update({ counter: increment })

  res.status(200).json({})
}