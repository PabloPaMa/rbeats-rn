export const getFormValues = async () => {
  const jobs = await fetch('https://s3-us-west-2.amazonaws.com/alucinaprojects/iper/app/json/jobs.json').then(res => res.json())
    , countries = await fetch('https://s3-us-west-2.amazonaws.com/alucinaprojects/iper/app/json/countries.json').then(res => res.json())

  return { countries, jobs }
}