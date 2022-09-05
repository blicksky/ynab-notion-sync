import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import * as ynab from 'ynab'

const YNAB_PERSONAL_ACCESS_TOKEN_SSM_PARAMETER_NAME = 'ynabPersonalAccessToken';

const client = new SSMClient({});

export async function handler(): Promise<void> {
    const response = await client.send(new GetParameterCommand({
        Name: YNAB_PERSONAL_ACCESS_TOKEN_SSM_PARAMETER_NAME,
        WithDecryption: true
    }));

    const ynabPersonalAccessToken = response.Parameter?.Value

    if (!ynabPersonalAccessToken) {
        throw new Error ("Unable to retrive YNAB access token")
    }

    const ynabAPI = new ynab.API(ynabPersonalAccessToken)

    console.log("??", await ynabAPI.budgets.getBudgets());
}
