import * as promptSync from 'prompt-sync'
import {currencyModel} from './model'

const prompt = promptSync()
const baseCurrency = prompt("Enter base currency :-")
const conversionCurrency = prompt("Enter conversion currency :-")
const amount = prompt("Enter the amount to be converted :-")
if(isNaN(Number(amount)))
{
    console.log(`Please enter a valid amount`)
}
else
{
    //console.log(typeof(baseCurrency))
    console.log(`Entered base currency is ${baseCurrency}`)
    console.log(`Entered conversion currency is ${conversionCurrency}`)
    getCurrencyResponse(baseCurrency,conversionCurrency,Number(amount))    
}


async function getCurrencyResponse(baseCode: string, conversionCurrency:string, amount:number){
    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${baseCode.trim()}`)
        if(response.status === 200)
        {
            const currency =await response.json() as currencyModel
            if(currency.result.toLocaleLowerCase()!=="success")
            {
                console.log(`Unsupported baseCurrency`)
            }
            else
            {
                if(currency.rates[conversionCurrency.trim()]===null || currency.rates[conversionCurrency.trim()]===undefined)
                {
                    console.log(`Provide proper conversion currency`)
                }
                else
                {
                    console.log(`${amount} ${baseCode.trim()} = ${(amount * currency.rates[conversionCurrency.trim()]).toFixed(2)} ${conversionCurrency.trim()}`)
                }
            }
        }
        else
        {
            console.log(`Getting status ${response.status}`)
        }
        
        //const val = JSON.stringify(currency) as currencyModel


        //return response
    } catch (error:any) {
        // console.error(error)
        return error
    }
}