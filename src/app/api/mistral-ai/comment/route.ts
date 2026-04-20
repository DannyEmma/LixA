import { Mistral } from '@mistralai/mistralai'
import { NextRequest, NextResponse } from 'next/server'
import { MIN_CHAR_IA } from '@/app/lib/parameters'

const client = new Mistral({ apiKey: process.env.MISTRAL_AI_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const prompt = `
    Contexte:
    Mon programme calcul la densité des lettres et des mots, à partir d'un texte donné par l'utilisateur.
    L'utilisateur souhaite savoir ce vous pensez de ces données, les conseils que vous pourrait lui apporter
  
    Données:  
    - Texte: ${body.text}
  
    - Densité des ${body.type}s: ${body.densities}
  
    Consigne: 
    - Donner une explication de ces données, ne citer aucune densité.
    - Votre conseil doit porter uniquement sur les ${body.type}
    - La réponse devra être sous forme d'unordered list HTML.
    - Parlez soit des lettres soit des mots (en fonction du type)
    - Les mots clés devront être encadré par des balises <strong>
    - Minimum 2 mots clés par point
    - Maximum 4 points
    - Toutes lettres ou mots individuelle mentionnée explicitement dans la réponse doit être encadrée par les balises <strong>" et "</strong> sans exception.
    - La réponse doit contenir **uniquement** la liste html, sans aucune autre phrase, explication ou balise.
    -  **Ne mets pas de balise Markdown (comme \`\`\`html) dans la réponse. Le résumé doit être du texte brut.**
    `

    //-- Check if there are all parameters required --
    if (!body.hasOwnProperty('text') || !body.hasOwnProperty('type') || !body.hasOwnProperty('densities')) {
      return NextResponse.json({ message: 'Il vous manque au moin 1 paramètre à la requête !' }, { status: 400 })
    }

    //-- Check if parameters is not empty --
    if (body.text === '' || body.type === '' || body.densities.length === 0) {
      return NextResponse.json({ message: 'Les données ne sont pas suffisantes !' }, { status: 400 })
    }

    //-- Check the minimum characters authorized --
    if (body.text.length <= MIN_CHAR_IA) {
      return NextResponse.json({ message: 'Le texte doit avoir au moin 500 caractères !' }, { status: 400 })
    }

    const chatResponse = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: prompt }],
    })

    return NextResponse.json({ response: chatResponse.choices[0].message.content }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
