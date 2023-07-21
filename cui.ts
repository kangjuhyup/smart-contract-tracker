import { input,select,password,confirm } from '@inquirer/prompts';

const inputDBPwd = async () => {
    const pwd = await password(
        {
            message:'데이터베이스 유저의 패스워드를 입력하세요 :',            
            mask : '*',
            validate: input => {
                if (!input) return '패스워드가 입력되지 않았습니다.';
                return true;
            },
        },
    );

    return pwd;
}

const inputDBName = async () => {
    const name = await input(
        {
            message: '데이터베이스의 이름을 입력하세요 : ',
            validate: input => {
                if (!input) return '데이터베이스 이름이 입력되지 않았습니다.';                
                return true;
            },
        },
    );
    return name;
}

const inputDBUser = async () => {
    const user = await input(
        {
            message: '데이터베이스 유저네임을 입력하세요 : ',
            validate: input => {
                if (!input) return '유저네임이 입력되지 않았습니다.';                
                return true;
            },
        },
    );
    return user;
}

const inputDBHost = async () => {
    const host = await input(
        {
            message: '데이터베이스 Host를 입력하세요 : ',
            validate: input => {
                if (!input) return 'Host가 입력되지 않았습니다.';                
                return true;
            },
        },
    );
    return host;
}

const inputDBPort = async () => {
    const port = await input(
        {
            message: '데이터베이스 Port를 입력하세요 : ',
            validate: input => {
                if (!input) return 'Port가 입력되지 않았습니다.';
                
                const inputNumber = parseInt(input);
                if(!inputNumber)return 'Port는 숫자만 입력하세요.';
                    
                
                return true;
            },
        },
    );
    return port;
}

const selectDB = async () => {
    const db = await select({
        message: '데이터를 저장하기 위한 Database를 선택하세요.',
        choices: [
          {
            name: 'PostgreSQL',
            value: 'postgres',
            description: 'PostgresQL에 파싱한 데이터를 저장합니다.',
          },
          {
            name: 'MySQL',
            value: 'mysql',
            description: 'PostgresQL에 파싱한 데이터를 저장합니다.',
          },
        ],
    })
    return db;
}

const inputChainId = async () => {
    const chainId = await input(
        {
            message: '모니터링하려는 블록체인 네트워크의 Chain ID를 입력하세요 : ',
            validate: input => {
                if (!input) return '체인아이디가 입력되지 않았습니다.';
                
                const inputNumber = parseInt(input);
                if(!inputNumber)return '체인아이디는 숫자만 입력하세요.';
                    
                
                return true;
            },
        },
    );
    return chainId;
}

const inputEndpoint = async () => {
    const endpoint = await input(
        {
            message: '모니터링하려는 블록체인 네트워크의 RPC 엔드포인트를 입력하세요 : ',
            validate: input => {
                if (!input) return '주소가 입력되지 않았습니다.';                
                return true;
            },
        },
    );
    return endpoint;
}

const confirmDB = async ({ db, host, port, db_name, user, pwd }) => {
    return await confirm({ message : `
        입력한 데이터베이스 정보가 맞습니까?
        데이터베이스 종류 : ${db}
        데이터베이스 Host : ${host}
        데이터베이스 Port : ${port}
        데이터베이스 이름 : ${db_name}
        데이터베이스 유저 : ${user}
    `})
}

const setDatabase = async () => {
    const db = await selectDB();
    const host = await inputDBHost();
    const port = await inputDBPort();
    const db_name = await inputDBName();
    const user = await inputDBUser();
    const pwd = await inputDBPwd();
    const confirm = await confirmDB({
        db,
        host,
        port,
        db_name,
        user,
        pwd,
    })
    if(!confirm) return setDatabase();
    else return {
        db,
        host,
        port,
        db_name,
        user,
        pwd,
    }
}

  
  (async () => {
    const { db, host, port, db_name, user, pwd } = await setDatabase();
  })();
  
  
  
  