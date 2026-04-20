import { Mistral } from '@mistralai/mistralai'
import { NextRequest, NextResponse } from 'next/server'
import { MIN_CHAR_IA } from '@/app/lib/parameters'

const client = new Mistral({ apiKey: process.env.MISTRAL_AI_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const prompt = `
        Contexte:
        L'utilisateur entre un texte dans mon programme et souhaite le résumer, selon 2 critères :
        - La longeur: exprimé en nombre de caractère, espace inclus.
        - La complexité: exprimé en pourcentage 0%: très facile, 100%: très difficile

        Texte à résumer: ${body.text}

      Consignes :
      1. Le résumé doit contenir au maximum ${body.resumeLength} caractères, espaces inclus.
      2. La complexité du résumé doit correspondre à ${body.complexity}%.
      3. La réponse doit contenir **uniquement** le résumé, sans aucune autre phrase, explication ou balise.
      4. Ne pas ajouter de titre, d'introduction, de conclusion, ni de ponctuation inutile à la fin.
      5. Ne jamais dépasser la longueur indiquée, même d'un seul caractère.

      Réponds uniquement par le résumé, rien d'autre.
    `

    //-- Check if there are all parammeters required --
    if (!body.hasOwnProperty('text') || !body.hasOwnProperty('resumeLength') || !body.hasOwnProperty('complexity')) {
      return NextResponse.json({ message: 'Il vous manque au moin 1 paramètre à la requête !' }, { status: 400 })
    }

    //-- Check if parameters is not empty --
    if (body.text === '' || !body.resumeLength || !body.complexity) {
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
    return NextResponse.json({ response: '', message: error }, { status: 500 })
  }
}
