import test from "../src/email/test"

const main = async () => {
  await test({ name: 'Dee' });
  await test({ name: 'Chicka' });
  console.log('Sent all mails to test account');
}

main()
