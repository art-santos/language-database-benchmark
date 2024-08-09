#!/usr/bin/env bun

import { createReadStream, createWriteStream, stat } from 'fs'
import { basename } from 'path'
import { Transform } from 'stream'
import { promisify } from 'util'

const MAX_SIZE = 490 * 1024 * 1024 // 100MB

const splitFile = async (filePath: string): Promise<void> => {
  const fileStats = await promisify(stat)(filePath)
  const totalSize = fileStats.size
  let processedSize = 0

  const fileStream = createReadStream(filePath, 'utf-8')
  let header = ''
  let partIndex = 1
  let partSize = 0
  let partStream = createWriteStream(getPartFileName(filePath, partIndex))

  const splitStream = new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split('\n')

      if (!header) {
        header = lines[0] + '\n'
        partStream.write(header)
        partSize += Buffer.byteLength(header, 'utf-8')
        lines.shift()
      }

      for (const line of lines) {
        const lineSize = Buffer.byteLength(line, 'utf-8') + 1 // +1 for newline character

        if (partSize + lineSize > MAX_SIZE) {
          partStream.end()
          partIndex++
          partStream = createWriteStream(getPartFileName(filePath, partIndex))
          partStream.write(header)
          partSize = Buffer.byteLength(header, 'utf-8')
        }

        partStream.write(line + '\n')
        partSize += lineSize
        processedSize += lineSize

        // Log the progress
        console.log(`Processed: ${(processedSize / (1024 * 1024)).toFixed(2)} MB, Remaining: ${((totalSize - processedSize) / (1024 * 1024)).toFixed(2)} MB`)
      }

      callback()
    },

    flush(callback) {
      partStream.end()
      callback()
    }
  })

  await new Promise<void>((resolve, reject) => {
    fileStream.pipe(splitStream).on('finish', () => {
      resolve()
    }).on('error', (err) => {
      reject(err)
    })
  })
}

const getPartFileName = (filePath: string, partIndex: number): string => {
  const fileName = basename(filePath, '.csv')
  return `${fileName}_part${partIndex}.csv`
}

const filePaths = process.argv.slice(2)

await Promise.all(
  filePaths.map(async filePath => {
    try {
      const stats = await promisify(stat)(filePath)

      if (stats.isFile()) {
        console.log(`Splitting file: ${filePath}`)
        await splitFile(filePath)
        console.log(filePath, 'done!')
      }
    } catch (err) {
      console.error(`Error processing file: ${filePath}`, err)
    }
  })
)


splitFile('data.csv')