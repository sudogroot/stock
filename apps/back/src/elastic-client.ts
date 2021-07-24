import {Client} from '@elastic/elasticsearch'
import type { Client as ClientType } from '@elastic/elasticsearch/api/new'

// @ts-expect-error @elastic/elasticsearch
export const client: ClientType = new Client({
  cloud: { // todo  in .env
    id: 'memory-optimized-deployment:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyQwZTM5Yzc2Zjg0YmY0ZThhYWU2MzZiYTRmYTI4NTM0ZiQxMmZhYzc2NjRiNzU0MDg3YjA5ZGRjNDFkNWRlZWI2Mg==',
  },
  auth: {
    username: 'elastic',
    password: 'htwq4LxpUj9qLy83hRblPBkb' // todo  in .env
  }
})
