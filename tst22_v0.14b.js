        // --- 배경음악 설정 ---
        const bgmUrl = 'Data/music/1. Baba Is You Theme.mp3';
        const bgm = document.getElementById('bgm');
        let bgmLoaded = false;
        if (bgmUrl) {
            bgm.src = bgmUrl;
            bgm.volume = 0.5;
            bgm.muted = false;
            bgm.onerror = () => console.warn('BGM 로드 실패:', bgmUrl, bgm.error);
            bgm.onloadeddata = () => {
                console.log('BGM 로드 성공:', bgmUrl);
                bgmLoaded = true;
            };
            bgm.oncanplay = () => console.log('BGM 재생 가능 상태');
            bgm.onplay = () => console.log('BGM 재생 중');
            bgm.onended = () => console.log('BGM 재생 종료');
        }


        // --- 타일 및 오브젝트 이미지 매핑 (기존 유지) ---
        const tileImages = {};
        const objectImages = {
            //-- 스프라이트 파일 이름 형식 설명
            // [색/물체.png] 예시-> 2W.png : 노란색 벽 물체png, 4A.png : 파란색 근거리 공격 물체png.
            // [색/물체_스트라이프구분/방향.png] 예시 -> 1P_aB.png : 초록색 플레이어 물체의 Bottom쪽을 바라보는 스트라이프a, 1P_bB.png : 초록색 플레이어 물체의 Bottom쪽을 바라보는 스트라이프b, 1P_aT.png : 초록색 플레이어 물체의 Top쪽을 바라보는 스트라이프a
            // 이동 할 때 마다 스트라이프는 a<->b 계속 변환하여 애니메이션 효과 부여
            // 방향은 "T, B, L, R" 속성이 존재하며, 각각 "상, 하, 좌, 우" 를 의미
            // 스트라이프가 존재하는 물체는 "플레이어, 근거리 공격, 원거리 공격"만 존재
            '1P_aT': 'Data/sprites/1P_aT.png', // 초록색 플레이어 aT
            '1P_aB': 'Data/sprites/1P_aB.png', // 초록색 플레이어 aB
            '1P_aL': 'Data/sprites/1P_aL.png', // 초록색 플레이어 aL
            '1P_aR': 'Data/sprites/1P_aR.png', // 초록색 플레이어 aR

            '1P_bT': 'Data/sprites/1P_bT.png', // 초록색 플레이어 bT
            '1P_bB': 'Data/sprites/1P_bB.png', // 초록색 플레이어 bB
            '1P_bL': 'Data/sprites/1P_bL.png', // 초록색 플레이어 bL
            '1P_bR': 'Data/sprites/1P_bR.png', // 초록색 플레이어 bR
            
            '1F': 'Data/sprites/1F.png', // 초록색 도착점

            '1A_aT': 'Data/sprites/1A_aT.png', // 초록색 근거리 공격 aT
            '1A_aB': 'Data/sprites/1A_aB.png', // 초록색 근거리 공격 aB
            '1A_aL': 'Data/sprites/1A_aL.png', // 초록색 근거리 공격 aL
            '1A_aR': 'Data/sprites/1A_aR.png', // 초록색 근거리 공격 aR

            '1A_bT': 'Data/sprites/1A_bT.png', // 초록색 근거리 공격 bT
            '1A_bB': 'Data/sprites/1A_bB.png', // 초록색 근거리 공격 bB
            '1A_bL': 'Data/sprites/1A_bL.png', // 초록색 근거리 공격 bL
            '1A_bR': 'Data/sprites/1A_bR.png', // 초록색 근거리 공격 bR

            '1B_aT': 'Data/sprites/1B_aT.png', // 초록색 원거리 공격 aT
            '1B_aB': 'Data/sprites/1B_aB.png', // 초록색 원거리 공격 aB
            '1B_aL': 'Data/sprites/1B_aL.png', // 초록색 원거리 공격 aL
            '1B_aR': 'Data/sprites/1B_aR.png', // 초록색 원거리 공격 aR

            '1B_bT': 'Data/sprites/1B_bT.png', // 초록색 원거리 공격 bT
            '1B_bB': 'Data/sprites/1B_bB.png', // 초록색 원거리 공격 bB
            '1B_bL': 'Data/sprites/1B_bL.png', // 초록색 원거리 공격 bL
            '1B_bR': 'Data/sprites/1B_bR.png', // 초록색 원거리 공격 bR

            '1W': 'Data/sprites/1W.png', // 초록색 벽
            '1I': 'Data/sprites/1I.png', // 초록색 무적 벽
            //--
            '2P_aT': 'Data/sprites/2P_aT.png', // 노란색 플레이어 aT
            '2P_aB': 'Data/sprites/2P_aB.png', // 노란색 플레이어 aB
            '2P_aL': 'Data/sprites/2P_aL.png', // 노란색 플레이어 aL
            '2P_aR': 'Data/sprites/2P_aR.png', // 노란색 플레이어 aR

            '2P_bT': 'Data/sprites/2P_bT.png', // 노란색 플레이어 bT
            '2P_bB': 'Data/sprites/2P_bB.png', // 노란색 플레이어 bB
            '2P_bL': 'Data/sprites/2P_bL.png', // 노란색 플레이어 bL
            '2P_bR': 'Data/sprites/2P_bR.png', // 노란색 플레이어 bR

            '2F': 'Data/sprites/2F.png', // 노란색 도착점

            '2A_aT': 'Data/sprites/2A_aT.png', // 노란색 근거리 공격 aT
            '2A_aB': 'Data/sprites/2A_aB.png', // 노란색 근거리 공격 aB
            '2A_aL': 'Data/sprites/2A_aL.png', // 노란색 근거리 공격 aL
            '2A_aR': 'Data/sprites/2A_aR.png', // 노란색 근거리 공격 aR

            '2A_bT': 'Data/sprites/2A_bT.png', // 노란색 근거리 공격 bT
            '2A_bB': 'Data/sprites/2A_bB.png', // 노란색 근거리 공격 bB
            '2A_bL': 'Data/sprites/2A_bL.png', // 노란색 근거리 공격 bL
            '2A_bR': 'Data/sprites/2A_bR.png', // 노란색 근거리 공격 bR

            '2B_aT': 'Data/sprites/2B_aT.png', // 노란색 원거리 공격 aT
            '2B_aB': 'Data/sprites/2B_aB.png', // 노란색 원거리 공격 aB
            '2B_aL': 'Data/sprites/2B_aL.png', // 노란색 원거리 공격 aL
            '2B_aR': 'Data/sprites/2B_aR.png', // 노란색 원거리 공격 aR

            '2B_bT': 'Data/sprites/2B_bT.png', // 노란색 원거리 공격 bT
            '2B_bB': 'Data/sprites/2B_bB.png', // 노란색 원거리 공격 bB
            '2B_bL': 'Data/sprites/2B_bL.png', // 노란색 원거리 공격 bL
            '2B_bR': 'Data/sprites/2B_bR.png', // 노란색 원거리 공격 bR

            '2W': 'Data/sprites/2W.png', // 노란색 벽
            '2I': 'Data/sprites/2I.png', // 노란색 무적 벽
            //--
            '3P_aT': 'Data/sprites/3P_aT.png', // 빨간색 플레이어 aT
            '3P_aB': 'Data/sprites/3P_aB.png', // 빨간색 플레이어 aB
            '3P_aL': 'Data/sprites/3P_aL.png', // 빨간색 플레이어 aL
            '3P_aR': 'Data/sprites/3P_aR.png', // 빨간색 플레이어 aR

            '3P_bT': 'Data/sprites/3P_bT.png', // 빨간색 플레이어 bT
            '3P_bB': 'Data/sprites/3P_bB.png', // 빨간색 플레이어 bB
            '3P_bL': 'Data/sprites/3P_bL.png', // 빨간색 플레이어 bL
            '3P_bR': 'Data/sprites/3P_bR.png', // 빨간색 플레이어 bR

            '3F': 'Data/sprites/3F.png', // 빨간색 도착점

            '3A_aT': 'Data/sprites/3A_aT.png', // 빨간색 근거리 공격 aT
            '3A_aB': 'Data/sprites/3A_aB.png', // 빨간색 근거리 공격 aB
            '3A_aL': 'Data/sprites/3A_aL.png', // 빨간색 근거리 공격 aL
            '3A_aR': 'Data/sprites/3A_aR.png', // 빨간색 근거리 공격 aR

            '3A_bT': 'Data/sprites/3A_bT.png', // 빨간색 근거리 공격 bT
            '3A_bB': 'Data/sprites/3A_bB.png', // 빨간색 근거리 공격 bB
            '3A_bL': 'Data/sprites/3A_bL.png', // 빨간색 근거리 공격 bL
            '3A_bR': 'Data/sprites/3A_bR.png', // 빨간색 근거리 공격 bR

            '3B_aT': 'Data/sprites/3B_aT.png', // 빨간색 원거리 공격 aT
            '3B_aB': 'Data/sprites/3B_aB.png', // 빨간색 원거리 공격 aB
            '3B_aL': 'Data/sprites/3B_aL.png', // 빨간색 원거리 공격 aL
            '3B_aR': 'Data/sprites/3B_aR.png', // 빨간색 원거리 공격 aR

            '3B_bT': 'Data/sprites/3B_bT.png', // 빨간색 원거리 공격 bT
            '3B_bB': 'Data/sprites/3B_bB.png', // 빨간색 원거리 공격 bB
            '3B_bL': 'Data/sprites/3B_bL.png', // 빨간색 원거리 공격 bL
            '3B_bR': 'Data/sprites/3B_bR.png', // 빨간색 원거리 공격 bR

            '3W': 'Data/sprites/3W.png', // 빨간색 벽
            '3I': 'Data/sprites/3I.png', // 빨간색 무적 벽
            //--
            '4A_aT': 'Data/sprites/4A_aT.png', // 파란색 근거리 공격 aT
            '4A_aB': 'Data/sprites/4A_aB.png', // 파란색 근거리 공격 aB
            '4A_aL': 'Data/sprites/4A_aL.png', // 파란색 근거리 공격 aL
            '4A_aR': 'Data/sprites/4A_aR.png', // 파란색 근거리 공격 aR

            '4A_bT': 'Data/sprites/4A_bT.png', // 파란색 근거리 공격 bT
            '4A_bB': 'Data/sprites/4A_bB.png', // 파란색 근거리 공격 bB
            '4A_bL': 'Data/sprites/4A_bL.png', // 파란색 근거리 공격 bL
            '4A_bR': 'Data/sprites/4A_bR.png', // 파란색 근거리 공격 bR

            '4B_aT': 'Data/sprites/4B_aT.png', // 파란색 원거리 공격 aT
            '4B_aB': 'Data/sprites/4B_aB.png', // 파란색 원거리 공격 aB
            '4B_aL': 'Data/sprites/4B_aL.png', // 파란색 원거리 공격 aL
            '4B_aR': 'Data/sprites/4B_aR.png', // 파란색 원거리 공격 aR

            '4B_bT': 'Data/sprites/4B_bT.png', // 파란색 원거리 공격 bT
            '4B_bB': 'Data/sprites/4B_bB.png', // 파란색 원거리 공격 bB
            '4B_bL': 'Data/sprites/4B_bL.png', // 파란색 원거리 공격 bL
            '4B_bR': 'Data/sprites/4B_bR.png', // 파란색 원거리 공격 bR

            '4W': 'Data/sprites/4W.png', // 파란색 벽
            '4I': 'Data/sprites/4I.png', // 파란색 무적 벽
            
        };

        // --- 스테이지 데이터 ---
        const stages = [


            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '1P', '--', '--', '--', '--', '--', '--', '2F', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    '초록색 플레이어가 노란색 도착점에 닿으면 레벨이 클리어 됩니다.',
                    'W, A, S, D로 이동합니다'
                ],
                turnLimit: 0
            },
            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '00', '00', '--', '--', '--', '--', '00', '00', '00'],
                    ['00', '00', '00', '--', '00', '00', '00', '00', '00', '00'],
                    ['00', '1P', '--', '--', '2W', '--', '--', '--', '2F', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    '모든 규칙은 왼쪽부터 적용됩니다.',
                    '"SPACE"키로 물체를 부술 수 있습니다.'
                ],
                turnLimit: 18
            },
            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '3F', '--', '--', '--', '--', '--', '--', '1P', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    '모든 규칙은 왼쪽부터 적용됩니다.',
                    '"TAP"키로 물체의 색을 바꿀 수 있습니다.',
                    '바뀌는 순서는 초록 > 노간 > 빨강 순서입니다.'
                ],
                turnLimit: 0
            },
            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '00', '00', '00', '00', '00', '3B', '00', '00', '00', '00', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '1P', '--', '--', '--', '--', '--', '--', '--', '--', '2F', '00'],
                    ['00', '00', '--', '00', '00', '00', '00', '00', '00', '00', '--', '00'],
                    ['00', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    '빨간색 물체는 당신을 공격하는 적입니다.'
                ],
                turnLimit: 20
            },
            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '4W', '--', '--', '--', '00', '00', '00', '00', '00', '00'],
                    ['00', '00', '00', '00', '--', '00', '00', '00', '00', '00', '00'],
                    ['00', '00', '3P', '--', '--', '--', '--', '00', '00', '00', '00'],
                    ['00', '00', '00', '00', '00', '00', '--', '00', '00', '00', '00'],
                    ['00', '00', '00', '1A', '--', '--', '--', '--', '--', '2F', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    '예외로 파란색 물체는 어떠한 규칙도 통하지 않습니다.',
                    '게다가 이들이 가장 왼쪽에 있으면 다른 물체들도 규칙을 물려받을 수 없게 됩니다.',
                    ' ',
                    '마우스 좌클릭으로 물체를 부술 수 있습니다. (공격 가능 물체만)',
                    '마우스 좌클릭으로 어떤 물체를 조작할지 선택할 수 있습니다.'
                ],
                turnLimit: 30
            },

            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '00', '3B', '00', '3B', '00', '3B', '00', '00', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '--', '--', '--', '--', '--', '--', '--', '2F', '00'],
                    ['00', '--', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '--', '--', '--', '--', '--', '--', '--', '--', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '--', '00'],
                    ['00', '1P', '--', '--', '--', '--', '--', '--', '--', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    'insert tooltip here'
                ],
                turnLimit: 30
            },
            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '00', '00', '3A', '2W', '--', '00', '00', '00', '00'],
                    ['00', '00', '00', '00', '00', '--', '00', '00', '00', '00'],
                    ['00', '1P', '--', '--', '--', '2W', '--', '--', '2F', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    'insert tooltip here'
                ],
                turnLimit: 28
            },

            {
                map: [
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
                    ['00', '--', '--', '--', '--', '--', '--', '00', '2F', '00'],
                    ['00', '--', '00', '00', '00', '00', '00', '4W', '--', '00'],
                    ['00', '--', '00', '--', '--', '--', '00', '--', '00', '00'],
                    ['00', '--', '00', '--', '00', '00', '4W', '--', '00', '00'],
                    ['00', '2A', '00', '2A', '00', '00', '3P', '00', '00', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    'insert tooltip here'
                ],
                turnLimit: 30
            },
                                    {
                map: [
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '00', '--', '00', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '00', '00', '3A', '00', '00', '--', '00', '--', '00', '1P', '--', '--', '--', '--', '4B', '--', '--', '--', '--', '--'],
                    ['--', '--', '00', '--', '2W', '00', '--', '00', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '00', '--', '--', '--', '--', '00', '--', '--', '--', '--', '--', '--', '1F', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '2W', '--', '2W', '00', '00', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '2F', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--']
                ],
                tooltip: [
                    'P-1 Stage.',
                    'Test A, B'
                ]
            },
            {
                map: [
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '2W', '2W', '2W', '2W', '2W', '--', '2W', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '2W', '--', '--', '--', '2W', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '2W', '--', '--', '--', '2W', '2W', '--', '--', '2W', '--', '--', '--', '2W', '--', '--', '--'],
                    ['--', '--', '--', '2W', '--', '--', '--', '2W', '--', '2W', '--', '--', '2W', '--', '2W', '--', '--', '--', '--'],
                    ['--', '--', '--', '2W', '--', '--', '--', '2W', '--', '2W', '--', '--', '--', '2F', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '2W', '--', '--', '--', '2W', '--', '2W', '--', '--', '2W', '--', '2W', '--', '--', '--', '--'],
                    ['--', '--', '--', '2W', '1P', '--', '--', '2W', '1A', '2W', '--', '2W', '--', '1B', '--', '2W', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--']
                ],
                tooltip: [
                    'Thank you for playing!',
                    '베타 테스트에 참여해 주셔서 감사합니다!'
                ],
                turnLimit: 0,
                clearMessage: '베타 테스트 클리어!',
                externalLink: {
                    url: 'https://forms.gle/2NfZ5iuPa6oGkGsL8',
                    buttonText: '베타 피드백 제출하기',
                    description: '게임에 대한 피드백을 남겨주세요! 3분도 안걸려요!'
                }
            }
        ];

        // --- 게임 상태 변수 ---
        let currentStage = 0;
        let turnCount = 0;
        let nextObjectId = 1;
        let gameState = {
            selected: null,
            objects: [],
            history: [],
            tooltipOverride: null
        };
        // [교체] let gameOver = false;
        let gameFlowState = 'playing'; // 'playing', 'won', 'lost'

        const grid = document.getElementById('grid');
        const message = document.getElementById('message');
        const tooltip = document.getElementById('tooltip');
        const stageDisplay = document.getElementById('stage-display');
        const clearMessage = document.getElementById('clear-message');
        const turnDisplay = document.getElementById('turn-display');
        const MAX_HISTORY = 256;
        const preloadedImagesCache = {}; // [신규] 프리로드된 이미지 객체를 저장할 전용 캐시

        // [신규] AI 이동 유효성 검사 헬퍼 함수
        function isMoveValid(row, col) {
            const stage = stages[currentStage];
            if (row < 0 || row >= stage.map.length || col < 0 || col >= stage.map[0].length) {
                return false; // 맵 밖
            }
            if (stage.map[row][col] === '00') {
                return false; // 이동 불가 타일
            }
            if (gameState.objects.some(o => o.row === row && o.col === col)) {
                return false; // 다른 객체가 있음
            }
            return true;
        }
                
        
        // --- A* 경로탐색 알고리즘 ---
        function findPathAStar(startRow, startCol, targetRow, targetCol, mapData, alliedColors) {
            const rows = mapData.length;
            const cols = mapData[0].length;
            
            function heuristic(row, col) {
                return Math.abs(row - targetRow) + Math.abs(col - targetCol);
            }
            
            function isValidMove(row, col) {
                if (row < 0 || row >= rows || col < 0 || col >= cols) 
                    return false;
                if (mapData[row][col] === '00') 
                    return false;
                
                const obj = gameState.objects.find(o => o.row === row && o.col === col);
                if (obj) {
                    if (row === targetRow && col === targetCol) 
                        return true;
                    return false;
                }
                return true;
            }
            
            const openSet = [{ row: startRow, col: startCol, g: 0, h: heuristic(startRow, startCol), f: heuristic(startRow, startCol), parent: null }];
            const closedSet = new Set();
            
            while (openSet.length > 0) {
                openSet.sort((a, b) => a.f - b.f);
                const current = openSet.shift();
                const key = `${current.row},${current.col}`;
                
                if (closedSet.has(key)) continue;
                closedSet.add(key);
                
                if (current.row === targetRow && current.col === targetCol) {
                    const path = [];
                    let node = current;
                    while (node) {
                        path.unshift({ row: node.row, col: node.col });
                        node = node.parent;
                    }
                    return path;
                }
                
                const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                for (const [dr, dc] of directions) {
                    const newRow = current.row + dr;
                    const newCol = current.col + dc;
                    const newKey = `${newRow},${newCol}`;
                    
                    if (closedSet.has(newKey) || !isValidMove(newRow, newCol)) continue;
                    
                    const g = current.g + 1;
                    const h = heuristic(newRow, newCol);
                    const f = g + h;
                    
                    const existing = openSet.find(node => node.row === newRow && node.col === newCol);
                    if (!existing || g < existing.g) {
                        if (existing) {
                            existing.g = g;
                            existing.f = f;
                            existing.parent = current;
                        } else {
                            openSet.push({ row: newRow, col: newCol, g, h, f, parent: current });
                        }
                    }
                }
            }
            return null;
        }

        // --- 공격 이펙트 생성 ---
        function createAttackEffect(targetRow, targetCol, attackType, attackerColor = 'red') {
            const gameContainer = document.getElementById('game-container');
            const tile = grid.querySelector(`.tile[data-row='${targetRow}'][data-col='${targetCol}']`);
            if (!tile || !gameContainer) return;

            const tileRect = tile.getBoundingClientRect();
            const containerRect = gameContainer.getBoundingClientRect();

            const effectElement = document.createElement('div');
            const colorSuffix = attackerColor === 'blue' ? '-blue' : '';
            effectElement.className = attackType === 'near' ? `attack-effect${colorSuffix}-near` : `attack-effect${colorSuffix}-far`;
            
            effectElement.style.position = 'absolute';
            effectElement.style.left = `${tileRect.left - containerRect.left}px`;
            effectElement.style.top = `${tileRect.top - containerRect.top}px`;
            
            if (attackType === 'near') {
                effectElement.style.width = `${tileRect.width * 2}px`;
                effectElement.style.height = `${tileRect.height * 2}px`;
                effectElement.style.transform = 'translate(-25%, -25%)';
            } else {
                effectElement.style.width = `${tileRect.width}px`;
                effectElement.style.height = `${tileRect.height / 4}px`;
                effectElement.style.top = `${tileRect.top - containerRect.top + tileRect.height * 0.375}px`;
            }
            
            gameContainer.appendChild(effectElement);

            setTimeout(() => {
                if (effectElement.parentNode) effectElement.remove();
            }, attackType === 'near' ? 1500 : 300);
        }

        // --- 턴 제한 체크 함수 ---
        function checkTurnLimit() {
            const stage = stages[currentStage];
            if (stage.turnLimit && stage.turnLimit > 0 && turnCount >= stage.turnLimit) {
                const arrivalPoints = gameState.objects.filter(o => o.type === 'F');
                arrivalPoints.forEach(point => {
                    addHistory('turnLimitRemove', { obj: { ...point } });
                    gameState.objects = gameState.objects.filter(o => o.id !== point.id);
                });
                
                gameState.tooltipOverride = '턴 제한 초과! R로 재시작하세요.';
                gameOver = true;
                return true;
            }
            return false;
        }

        // --- 패배 조건 체크 함수 ---
        function checkDefeatConditions() {
            const remainingArrivalPoints = gameState.objects.filter(o => o.type === 'F');
            if (remainingArrivalPoints.length === 0) {
                gameState.tooltipOverride = 'R을 눌러 스테이지 재시작';
                gameOver = true;
                return true;
            }
            return false;
        }

        // --- AI 시스템 ---
// [교체] processEnemyNearRange 함수 (끈질긴 추적 로직 수정)
// [교체] processEnemyNearRange 함수 (AI 결정 장애 해결)
// [교체] processEnemyNearRange 함수 (스타크래프트 철학 주입 최종 버전)
// [교체] processEnemyNearRange 함수 (하이브리드 경로 탐색 최종판)
function processEnemyNearRange(obj) {
    let currentTarget = gameState.objects.find(o => o.id === obj.targetId);

    // 1. 인식 해제 조건 확인
    if (currentTarget && (!isObjectPresent(currentTarget) || currentTarget.color !== 'green')) {
        obj.targetId = null;
        currentTarget = null;
        obj.isTracking = false;
    }

    // 2. 새로운 타겟 탐색 (타겟이 없을 때만)
    if (!obj.targetId) {
        const greenObjs = gameState.objects.filter(g =>
            g.color === 'green' && g.type !== 'F' &&
            Math.abs(g.row - obj.row) <= 2 && Math.abs(g.col - obj.col) <= 2
        );

        if (greenObjs.length > 0) {
            greenObjs.sort((a, b) => {
                const distA = Math.abs(a.row - obj.row) + Math.abs(a.col - obj.col);
                const distB = Math.abs(b.row - obj.row) + Math.abs(b.col - obj.col);
                if (distA !== distB) return distA - distB;
                if (a.col !== b.col) return a.col - b.col;
                return a.row - b.row;
            });
            obj.targetId = greenObjs[0].id;
            currentTarget = greenObjs[0];
            obj.isTracking = true;
            addHistory('aiTargetChange', { objId: obj.id, targetId: obj.targetId });
        } else {
            obj.isTracking = false;
            return;
        }
    }

    // 3. "끈질긴 추적" 실행
    if (obj.isTracking && currentTarget) {
        // 3.1. 공격
        if (Math.abs(currentTarget.row - obj.row) <= 1 && Math.abs(currentTarget.col - obj.col) <= 1) {
            addHistory('attack', { attacker: { id: obj.id, type: obj.type }, target: { ...currentTarget } });
            gameState.objects = gameState.objects.filter(o => o.id !== currentTarget.id);
            createAttackEffect(currentTarget.row, currentTarget.col, 'near', obj.color);
            obj.targetId = null;
            obj.isTracking = false;
            if (currentTarget === gameState.selected) {
                gameState.selected = gameState.objects.find(o => o.color === 'green' && o.type !== 'F') || null;
            }
            return;
        }

        // 3.2. 이동 결정 (하이브리드 방식)
        let bestMove = null;

        // 1단계: 전략가 (A* 경로 탐색)
        const path = findPathAStar(obj.row, obj.col, currentTarget.row, currentTarget.col, stages[currentStage].map);
        if (path && path.length > 1) {
            bestMove = { r: path[1].row, c: path[1].col };
        } else {
            // 2단계: 돌격병 (A* 실패 시 결정적 어그로 이동)
            const possibleMoves = [];
            const moves = [
                { r: obj.row - 1, c: obj.col }, // 위
                { r: obj.row + 1, c: obj.col }, // 아래
                { r: obj.row, c: obj.col - 1 }, // 왼쪽
                { r: obj.row, c: obj.col + 1 }  // 오른쪽
            ];

            for (const move of moves) {
                if (isMoveValid(move.r, move.c)) {
                    possibleMoves.push({
                        r: move.r,
                        c: move.c,
                        dist: Math.abs(move.r - currentTarget.row) + Math.abs(move.c - currentTarget.col)
                    });
                }
            }

            if (possibleMoves.length > 0) {
                const currentDist = Math.abs(obj.row - currentTarget.row) + Math.abs(obj.col - currentTarget.col);
                
                // 생존 본능: 현재보다 나은 이동만 후보로 선정
                let bestCandidates = possibleMoves.filter(m => m.dist < currentDist);

                if (bestCandidates.length > 0) {
                    // X축 우선 돌파: X좌표 차이를 가장 많이 줄이는 후보 선정
                    const minXDist = Math.min(...bestCandidates.map(m => Math.abs(m.c - currentTarget.col)));
                    bestCandidates = bestCandidates.filter(m => Math.abs(m.c - currentTarget.col) === minXDist);
                    
                    // Y축 보조 기동: 남은 후보 중 Y좌표 차이를 가장 많이 줄이는 후보 선정
                    if (bestCandidates.length > 1) {
                        const minYDist = Math.min(...bestCandidates.map(m => Math.abs(m.r - currentTarget.row)));
                        bestCandidates = bestCandidates.filter(m => Math.abs(m.r - currentTarget.row) === minYDist);
                    }
                    
                    bestMove = bestCandidates[0]; // 최종 결정
                }
            }
        }

        // 3.3. 최종 이동 처리
        if (bestMove) {
            const deltaRow = bestMove.r - obj.row;
            const deltaCol = bestMove.c - obj.col;
            let direction = obj.direction;
            if (deltaRow < 0) direction = 'T'; else if (deltaRow > 0) direction = 'B';
            else if (deltaCol < 0) direction = 'L'; else if (deltaCol > 0) direction = 'R';

            addHistory('enemyMove', { objId: obj.id, oldRow: obj.row, oldCol: obj.col, newRow: bestMove.r, newCol: bestMove.c });
            obj.row = bestMove.r;
            obj.col = bestMove.c;
            updateSprite(obj, 'move', direction);
        }
    }
}



// [교체 대상] processEnemyLongRange 함수
// [교체] processEnemyLongRange 함수
function processEnemyLongRange(obj) {
    let currentTarget = gameState.objects.find(o => o.id === obj.targetId);

    // 인식 해제 조건 확인
    if (currentTarget && (!isObjectPresent(currentTarget) || currentTarget.color !== 'green')) {
        obj.targetId = null;
        currentTarget = null;
        obj.turnsSinceRecognition = 0; // [수정]
        obj.isTracking = false;
    }

    // 새로운 타겟 탐색
    if (!obj.targetId) {
        const greenObjs = gameState.objects.filter(g =>
            g.color === 'green' && g.type !== 'F' &&
            Math.abs(g.row - obj.row) <= 3 && Math.abs(g.col - obj.col) <= 3
        );
        if (greenObjs.length > 0) {
            // ... 정렬 로직은 동일 ...
            obj.targetId = greenObjs[0].id;
            currentTarget = greenObjs[0];
            obj.turnsSinceRecognition = 1; // [수정] 타겟 인식 시 카운터 1로 시작
            obj.isTracking = true;
            addHistory('aiTargetChange', { objId: obj.id, targetId: obj.targetId });
        } else {
            obj.isTracking = false;
            return;
        }
    }

    // 타겟 확정 후 공격
    if (obj.isTracking && currentTarget) {
        if (obj.turnsSinceRecognition >= 2) { // [수정]
            addHistory('attack', { attacker: { id: obj.id, type: obj.type }, target: { ...currentTarget } });
            gameState.objects = gameState.objects.filter(o => o.id !== currentTarget.id);
            createAttackEffect(currentTarget.row, currentTarget.col, 'far', obj.color);
            obj.targetId = null;
            obj.isTracking = false;
            obj.turnsSinceRecognition = 0; // [수정] 공격 후 리셋
            if (currentTarget === gameState.selected) {
                gameState.selected = gameState.objects.find(o => o.color === 'green' && o.type !== 'F') || null;
            }
        } else {
            obj.turnsSinceRecognition++; // [수정] 공격하지 않으면 카운터 증가
        }
    }
}



        function isObjectPresent(obj) {
            return gameState.objects.some(o => o.id === obj.id);
        }

//        function loadStage() {
//            gameFlowState = 'playing'; // [신규] 스테이지 로드 시 항상 'playing' 상태로 시작
            // ... 기존 loadStage 코드 ... gameOver = false; 줄은 삭제하거나 주석 처리합니다.
//        }
        
        // --- 게임 로직 함수 ---
        // [교체] loadStage 함수
        function loadStage() {
            const stage = stages[currentStage];
            
            // [수정] 상태 초기화 로직을 가장 위로 이동
            gameFlowState = 'playing';
            turnCount = 0;
            nextObjectId = 1;
            gameState.selected = null;
            gameState.objects = [];
            gameState.history = [];
            gameState.tooltipOverride = null;

for (let row = 0; row < stage.map.length; row++) {
    for (let col = 0; col < stage.map[0].length; col++) {
        const code = stage.map[row][col];
        if (code !== '00' && code !== '--') {
            // 코드에서 타입과 색상 추출
            const type = code.charAt(1); // 두 번째 문자가 타입 (P, F, A, B, W, I)
            const colorNumber = parseInt(code.charAt(0)); // 첫 번째 문자가 색상 번호
            
            // 색상 번호를 색상 이름으로 변환
            let color;
            switch(colorNumber) {
                case 1: color = 'green'; break;
                case 2: color = 'yellow'; break;
                case 3: color = 'red'; break;
                case 4: color = 'blue'; break;
                default: color = 'green'; break;
            }

            const newObj = {
                id: nextObjectId++,
                row: row,
                col: col,
                type: type,
                color: color,
                code: code,
                targetId: null,
                isTracking: false,
                turnsSinceRecognition: 0,
                spriteState: 'a',
                direction: 'B'
            };

            // 스프라이트 상태 초기화 (P, A, B 타입만)
            if (['P', 'A', 'B'].includes(type)) {
                newObj.spriteState = 'a';
                newObj.direction = 'B';
            } else {
                // F, W, I 타입은 스프라이트 상태 불필요
                delete newObj.spriteState;
                delete newObj.direction;
            }

            gameState.objects.push(newObj);
        }
    }
}


            gameState.selected = gameState.objects.find(o => o.type === 'P' && o.color === 'green');
            console.log(`Stage ${currentStage + 1} loaded. Turn: ${turnCount}`);
            renderMap();
        }


// [교체 대상] renderMap 함수
// [교체] renderMap 함수 (전용 캐시에서 이미지 복제하여 사용)
// [교체] renderMap 함수 (캐시에서 imageKey로 직접 조회)
function renderMap() {
    const stage = stages[currentStage];
    grid.style.gridTemplateColumns = `repeat(${stage.map[0].length}, calc(40px * 1.25))`;
    grid.style.gridTemplateRows = `repeat(${stage.map.length}, calc(40px * 1.25))`;
    grid.innerHTML = '';

    for (let row = 0; row < stage.map.length; row++) {
        for (let col = 0; col < stage.map[0].length; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add(stage.map[row][col] === '00' ? 'empty' : 'floor');
            
            const objsOnTile = gameState.objects.filter(o => o.row === row && o.col === col);
            
            objsOnTile.sort((a, b) => {
                const zA = a.type === 'P' ? 10 : 5;
                const zB = b.type === 'P' ? 10 : 5;
                return zA - zB;
            });

            if (objsOnTile.length > 0) {
                objsOnTile.forEach(obj => {
                    const objCode = `${obj.color === 'green' ? '1' : obj.color === 'yellow' ? '2' : obj.color === 'red' ? '3' : '4'}${obj.type}`;
                    let imageKey = objCode;

                    // 스프라이트 애니메이션이 있는 타입만 처리
                    if (['P', 'A', 'B'].includes(obj.type)) {
                        // 스프라이트 상태가 없으면 기본값 설정
                        if (!obj.spriteState) obj.spriteState = 'a';
                        if (!obj.direction) obj.direction = 'B';
                        
                        imageKey = `${objCode}_${obj.spriteState}${obj.direction}`;
                    }

                    console.log(`이미지 키 생성: ${obj.type} -> ${imageKey}`);

                    
                    // 수정된 이미지 렌더링 로직
// 수정된 이미지 렌더링 로직
const cachedImage = preloadedImagesCache[imageKey];
console.log(`렌더링 시도: ${imageKey}, 캐시 존재: ${!!cachedImage}, 완료: ${cachedImage?.complete}`);

if (cachedImage && cachedImage.complete) {
    const img = cachedImage.cloneNode(true);
    img.alt = obj.type;
    img.classList.add('object-sprite');
    if(obj.type === 'P') img.classList.add('player-sprite');
    
    // 이미지가 실제로 DOM에 추가되는지 확인
    tile.appendChild(img);
    console.log(`✅ 이미지 DOM 추가 성공: ${imageKey}`);
} else {
    // 폴백: 텍스트 표시
    const textElement = document.createElement('div');
    textElement.classList.add(obj.color);
    textElement.textContent = obj.type;
    textElement.style.fontSize = '12px';
    textElement.style.fontWeight = 'bold';
    textElement.style.color = '#fff';
    textElement.style.backgroundColor = obj.color === 'green' ? '#00ff00' : obj.color === 'yellow' ? '#ffff00' : obj.color === 'red' ? '#ff0000' : '#0000ff';
    tile.appendChild(textElement);
    
    console.warn(`❌ 이미지 캐시 미스: ${imageKey}`);
    console.log(`사용 가능한 캐시 키:`, Object.keys(preloadedImagesCache).slice(0, 10));
}


                    
                    if (obj.isTracking && (obj.type === 'A' || obj.type === 'B') && (obj.color === 'red' || obj.color === 'blue')) {
                        tile.classList.add('tracking');
                    }
                    if (gameState.selected && gameState.selected.id === obj.id) {
                        tile.style.border = '2px solid #fff';
                    }
                    
                });
            }

            tile.dataset.row = row;
            tile.dataset.col = col;
            grid.appendChild(tile);
        }
    }

    if (gameFlowState === 'lost') {
        message.textContent = 'Z: 한 칸 되돌리기, R: 스테이지 초기화 하기';
    } else {
        message.textContent = '';
    }
    
    stageDisplay.textContent = `Stage: ${currentStage + 1}`;
    updateTurnDisplay();
    const tooltipText = gameState.tooltipOverride ? [gameState.tooltipOverride] : stage.tooltip;
    tooltip.innerHTML = tooltipText.map(line => `<span>${line}</span>`).join('');
    renderExternalLinkButton(stage);
}



        function updateTurnDisplay() {
            const turnDisplay = document.getElementById('turn-display');
            if (!turnDisplay) return;
            
            const stage = stages[currentStage];
            
            if (stage.turnLimit && stage.turnLimit > 0) {
                const remainingTurns = stage.turnLimit - turnCount;
                let displayText = `Turn: ${turnCount}/${stage.turnLimit} (남은 턴: ${remainingTurns})`;
                
                turnDisplay.className = '';
                if (remainingTurns <= 2) {
                    turnDisplay.classList.add('turn-critical');
                } else if (remainingTurns <= 5) {
                    turnDisplay.classList.add('turn-warning');
                }
                
                turnDisplay.textContent = displayText;
                turnDisplay.style.display = 'block';
            } else {
                turnDisplay.style.display = 'none';
            }
        }

        function renderExternalLinkButton(stage) {
            const existingContainer = document.getElementById('external-link-container');
            if (existingContainer) {
                existingContainer.remove();
            }
            
            if (stage.externalLink) {
                const container = document.createElement('div');
                container.id = 'external-link-container';
                container.className = 'external-link-container';
                
                const description = document.createElement('div');
                description.className = 'external-link-description';
                description.textContent = stage.externalLink.description;
                
                const button = document.createElement('button');
                button.id = 'external-link-button';
                button.textContent = stage.externalLink.buttonText;
                button.onclick = () => {
                    window.open(stage.externalLink.url, '_blank');
                };
                
                container.appendChild(description);
                container.appendChild(button);
                
                const gameWrapper = document.getElementById('game-wrapper');
                gameWrapper.appendChild(container);
            }
        }

        function canMove(row, col, movingObj) {
            const stage = stages[currentStage];
            if (row < 0 || row >= stage.map.length || col < 0 || col >= stage.map[0].length || stage.map[row][col] === '00') {
                return false;
            }
            const obj = gameState.objects.find(o => o.row === row && o.col === col);
            if (obj) {
                return obj.type === 'F' && obj.color === 'yellow' && movingObj.type === 'P' && movingObj.color === 'green';
            }
            return true;
        }

        // [교체] addHistory 함수
        function addHistory(action, data) {
            const relevantAiStates = gameState.objects
                .filter(o => ['A', 'B'].includes(o.type) && ['red', 'blue'].includes(o.color))
                .map(o => ({
                    id: o.id,
                    isTracking: o.isTracking,
                    targetId: o.targetId,
                    turnsSinceRecognition: o.turnsSinceRecognition || 0 // [수정]
                }));

            gameState.history.push({
                action,
                data,
                state: {
                    objects: JSON.parse(JSON.stringify(gameState.objects)),
                    aiStates: relevantAiStates,
                    turnCount: turnCount,
                    currentSelectedObjectId: gameState.selected ? gameState.selected.id : null
                }
            });
            
            if (gameState.history.length > MAX_HISTORY) {
                gameState.history.shift();
            }
        }

        

// [신규] 모든 게임 종료 조건을 순서대로 판정하는 중앙 함수
// [교체] checkGameEndConditions 함수
function checkGameEndConditions() {
    // 게임이 이미 끝나있다면, 추가 판정을 하지 않음
    if (gameFlowState !== 'playing') return true;

    // 1. 승리 조건 판정
    const player = gameState.objects.find(o => o.type === 'P' && o.color === 'green');
    const victoryTile = gameState.objects.find(o => o.type === 'F' && o.color === 'yellow');
    if (player && victoryTile && player.row === victoryTile.row && player.col === victoryTile.col) {
        gameFlowState = 'won'; // [신규] 승리 상태로 전환
        const stage = stages[currentStage];
        const clearText = stage.clearMessage || 'Clear!';
        clearMessage.textContent = clearText;
        clearMessage.style.display = 'block';
        clearMessage.classList.add('fade-in-out');

        setTimeout(() => {
            clearMessage.style.display = 'none';
            clearMessage.classList.remove('fade-in-out');
            currentStage++;
            if (currentStage >= stages.length) {
                currentStage = 0;
            }
            loadStage(); // 여기서 gameFlowState가 'playing'으로 리셋됨
        }, 2000);
        return true; // 게임 흐름 종료
    }

    // 2. 패배 조건 판정: 도착점 제거
    const remainingArrivalPoints = gameState.objects.filter(o => o.type === 'F');
    if (remainingArrivalPoints.length === 0) {
        gameFlowState = 'lost'; // [신규] 패배 상태로 전환
        gameState.tooltipOverride = '도착점이 사라졌습니다! R을 눌러 재시작하세요.';
        return true; // 게임 흐름 종료
    }
    
    // 3. 패배 조건 판정: 턴 제한 초과
    const stage = stages[currentStage];
    if (stage.turnLimit && stage.turnLimit > 0 && turnCount >= stage.turnLimit) {
        gameFlowState = 'lost'; // [신규] 패배 상태로 전환
        gameState.tooltipOverride = '턴 제한 초과! R로 재시작하세요.';
        return true; // 게임 흐름 종료
    }

    return false; // 게임 계속 진행
}



// [교체 대상] advanceTurn 함수
// advanceTurn 함수 상단의 gameOver 체크를 gameFlowState 체크로 변경
function advanceTurn() {
    if (gameFlowState !== 'playing') return; // [수정]

    turnCount++;
    addHistory('turnEnd', {}); // 턴 시작 시점에 상태 저장

    // 1. 모든 적 AI 행동 처리
    gameState.objects.forEach(obj => {
        if ((obj.type === 'A') && (obj.color === 'red' || obj.color === 'blue')) {
            processEnemyNearRange(obj);
        } else if ((obj.type === 'B') && (obj.color === 'red' || obj.color === 'blue')) {
            processEnemyLongRange(obj);
        }
    });

    // 2. 모든 행동이 끝난 후 게임 종료 조건 판정
    const isGameEnded = checkGameEndConditions();

    // 3. 맵 렌더링
    if (!isGameEnded) {
        renderMap();
    } else {
        // 게임이 종료된 경우에도 최종 상태를 렌더링해야 메시지 등이 보임
        renderMap(); 
    }
}


        function findLeftmost() {
            let leftmost = null;
            gameState.objects.forEach(obj => {
                if (!leftmost || obj.col < leftmost.col || (obj.col === leftmost.col && obj.row < leftmost.row)) {
                    leftmost = obj;
                }
            });
            return leftmost;
        }

        function updateSprite(obj, action, direction) {
            if (!['P', 'A', 'B'].includes(obj.type)) return;
            
            if (direction) {
                const dirMap = { 'w': 'T', 's': 'B', 'a': 'L', 'd': 'R', 'T': 'T', 'B': 'B', 'L': 'L', 'R': 'R' };
                obj.direction = dirMap[direction] || obj.direction;
            }
            
            if (action === 'move' || action === 'aim') {
                obj.spriteState = obj.spriteState === 'a' ? 'b' : 'a';
            }
        }

        // --- 이벤트 리스너 ---
// [교체 대상] document.addEventListener('keydown', ...);

// keydown 이벤트 리스너 전체 교체
// [교체] document.addEventListener('keydown', ...);
document.addEventListener('keydown', (e) => {
    if (bgmLoaded && bgm.paused) {
        bgm.play().catch(err => console.warn('BGM 재생 실패:', err));
    }

    // [핵심 수정] 'won' 상태에서는 어떤 키 입력도 허용하지 않음
    if (gameFlowState === 'won') {
        return;
    }

    if (e.key === 'r') {
        loadStage();
        return;
    }
    
    if (e.key === 'z') {
        if (gameState.history.length > 0) { // 'won' 상태는 위에서 이미 걸러짐
            const lastStateSnapshot = gameState.history.pop().state;
            
            gameState.objects = JSON.parse(JSON.stringify(lastStateSnapshot.objects));
            lastStateSnapshot.aiStates.forEach(savedAiState => {
                const gameObj = gameState.objects.find(o => o.id === savedAiState.id);
                if (gameObj) {
                    gameObj.isTracking = savedAiState.isTracking;
                    gameObj.targetId = savedAiState.targetId;
                    gameObj.turnsSinceRecognition = savedAiState.turnsSinceRecognition; // [수정]
                }
            });
            turnCount = lastStateSnapshot.turnCount;
            gameState.selected = lastStateSnapshot.currentSelectedObjectId ? gameState.objects.find(o => o.id === lastStateSnapshot.currentSelectedObjectId) : null;
            
            gameFlowState = 'playing'; 
            gameState.tooltipOverride = null;
            renderMap();
        }
        return;
    }
    
    // 'lost' 상태에서는 다른 키 차단
    if (gameFlowState === 'lost') {
        return;
    }

    // --- 'playing' 상태일 때의 로직 (이하 동일) ---
    let actionTaken = false;

    // 이동 (WASD)
    if (['w', 's', 'a', 'd'].includes(e.key)) {
        if (!gameState.selected || gameState.selected.color !== 'green' || gameState.selected.type === 'F') return;
        const newPos = { row: gameState.selected.row, col: gameState.selected.col };
        if (e.key === 'w') newPos.row--;
        else if (e.key === 's') newPos.row++;
        else if (e.key === 'a') newPos.col--;
        else if (e.key === 'd') newPos.col++;

        if (canMove(newPos.row, newPos.col, gameState.selected)) {
            addHistory('move', { obj: gameState.selected, oldRow: gameState.selected.row, oldCol: gameState.selected.col });
            gameState.selected.row = newPos.row;
            gameState.selected.col = newPos.col;
            updateSprite(gameState.selected, 'move', e.key);
            actionTaken = true;
        }
    }
    // 제거 (Space)
    else if (e.key === ' ') {
        e.preventDefault();
        const leftmost = findLeftmost();
        if (leftmost && leftmost.color === 'blue') {
            message.textContent = '파란색 물체로 인해 규칙이 막혔습니다';
            setTimeout(() => message.textContent = '', 2000);
            return;
        }
        if (leftmost) {
            addHistory('remove', { obj: { ...leftmost } });
            gameState.objects = gameState.objects.filter(o => o.id !== leftmost.id);
            if (leftmost === gameState.selected) {
                gameState.selected = gameState.objects.find(o => o.color === 'green' && o.type !== 'F') || null;
            }
            actionTaken = true;
        }
    }
    // 색상 변경 (Tab)
    else if (e.key === 'Tab') {
        e.preventDefault();
        const leftmost = findLeftmost();
        if (leftmost && leftmost.color === 'blue') {
            message.textContent = '파란색 물체로 인해 규칙이 막혔습니다';
            setTimeout(() => message.textContent = '', 2000);
            return;
        }
        if (leftmost) {
            const colors = ['green', 'yellow', 'red'];
            const currentIndex = colors.indexOf(leftmost.color);
            const oldColor = leftmost.color;

            if (currentIndex !== -1) {
                addHistory('color', { obj: leftmost, oldColor: leftmost.color });
                const nextColor = colors[(currentIndex + 1) % 3];
                leftmost.color = nextColor;
                
                const wasHostile = oldColor === 'red' || oldColor === 'blue';
                const isNoLongerHostile = leftmost.color !== 'red' && leftmost.color !== 'blue';

                if ((leftmost.type === 'A' || leftmost.type === 'B') && wasHostile && isNoLongerHostile) {
                    addHistory('aiStateReset', { objId: leftmost.id, oldState: { targetId: leftmost.targetId, isTracking: leftmost.isTracking, lastAttackTurn: leftmost.lastAttackTurn } });
                    leftmost.targetId = null;
                    leftmost.isTracking = false;
                    leftmost.lastAttackTurn = null;
                }
                actionTaken = true;
            }
        }
    }
    // 턴 넘기기 (Q)
    else if (e.key === 'q') {
        addHistory('skip', { turn: turnCount });
        actionTaken = true;
    }

    if (actionTaken) {
        advanceTurn();
    }
});




        // 마우스 클릭 이벤트 리스너
// 마우스 클릭 이벤트 리스너도 gameFlowState 체크 추가
        grid.addEventListener('click', (e) => {
            if (gameFlowState !== 'playing') return; // [신규]
            const tile = e.target.closest('.tile');
            if (!tile) return;
            const row = parseInt(tile.dataset.row);
            const col = parseInt(tile.dataset.col);
            const clickedObj = gameState.objects.find(o => o.row === row && o.col === col);

            // 초록색 오브젝트 선택
            if (clickedObj && clickedObj.color === 'green' && clickedObj.type !== 'F') {
                gameState.selected = clickedObj;
                renderMap();
                return;
            }

            // 공격 처리
            const greenAttack = gameState.selected && gameState.selected.color === 'green' && (gameState.selected.type === 'A' || gameState.selected.type === 'B');
            if (greenAttack) {
                const range = gameState.selected.type === 'A' ? 1 : 3;
                if (Math.abs(row - gameState.selected.row) <= range && Math.abs(col - gameState.selected.col) <= range) {
                    const target = gameState.objects.find(o => o.row === row && o.col === col && o.type !== 'I' && o.type !== 'F');
                    if (target) {
                        addHistory('attack', { target: { ...target } });
                        gameState.objects = gameState.objects.filter(o => o.id !== target.id);
                        createAttackEffect(row, col, gameState.selected.type === 'A' ? 'near' : 'far', 'green');
                        
                        if (target === gameState.selected) {
                            gameState.selected = gameState.objects.find(o => o.color === 'green' && o.type !== 'F') || null;
                        }
                    }
                    gameState.tooltipOverride = null;
                    advanceTurn();
                }
            }
        });

        // 게임 시작
        //loadStage();
        // [교체] loadStage();

// --- [신규] 이미지 프리로딩 시스템 ---
// [교체] preloadImages 함수 (WebP 시도 없이 PNG만 로드하도록 수정)
// [교체] preloadImages 함수 (이미지 객체를 전용 캐시에 저장)
// [교체] preloadImages 함수 (스프라이트 코드를 캐시 키로 사용)
// preloadImages() 함수에 추가할 디버깅 코드
async function preloadImages() {
  console.log("=== 이미지 프리로딩 시작 ===");
  console.log("objectImages 객체:", objectImages);
  
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('loading-progress-bar');
  
  if (loadingScreen) loadingScreen.style.display = 'flex';

  const imageEntries = Object.entries(objectImages);
  console.log("로드할 이미지 목록:", imageEntries);
  
  const totalImages = imageEntries.length;
  let loadedCount = 0;

  const promises = imageEntries.map(([key, pngPath]) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        loadedCount++;
        console.log(`✅ 이미지 로드 성공: ${key} -> ${pngPath}`);
        console.log(`이미지 크기: ${img.width}x${img.height}`);
        
        if (progressBar) {
          progressBar.style.width = `${(loadedCount / totalImages) * 100}%`;
        }
        preloadedImagesCache[key] = img;
        resolve(img);
      };
      
      img.onerror = (error) => {
        console.error(`❌ 이미지 로드 실패: ${key} -> ${pngPath}`);
        console.error("오류 상세:", error);
        
        // 파일 존재 여부 확인
        fetch(pngPath)
          .then(response => {
            console.log(`파일 응답 상태: ${response.status}`);
          })
          .catch(fetchError => {
            console.error(`파일 접근 실패: ${fetchError.message}`);
          });
          
        loadedCount++;
        if (progressBar) {
          progressBar.style.width = `${(loadedCount / totalImages) * 100}%`;
        }
        resolve(null);
      };
      
      console.log(`🔄 이미지 로딩 시도: ${pngPath}`);
      img.src = pngPath;
    });
  });

  try {
    const results = await Promise.all(promises);
    const successCount = results.filter(r => r !== null).length;
    console.log(`=== 프리로딩 완료: ${successCount}/${totalImages} 성공 ===`);
    console.log("캐시된 이미지들:", Object.keys(preloadedImagesCache));
  } catch (error) {
    console.error("프리로딩 중 오류:", error);
  }

  if (loadingScreen) loadingScreen.style.display = 'none';
}

// 콘솔에서 실행해볼 수 있는 확인 코드
console.log("현재 디렉토리:", window.location.href);
console.log("이미지 경로들:", Object.values(objectImages));

// 각 이미지 파일이 실제로 존재하는지 확인
Object.entries(objectImages).forEach(([key, path]) => {
  fetch(path)
    .then(response => {
      if (response.ok) {
        console.log(`✅ ${key}: 파일 존재`);
      } else {
        console.log(`❌ ${key}: 파일 없음 (${response.status})`);
      }
    })
    .catch(error => {
      console.log(`❌ ${key}: 접근 불가 - ${error.message}`);
    });
});








// --- [신규] 메인 게임 실행 함수 ---
async function main() {
    await preloadImages();
    loadStage();
}

main();
