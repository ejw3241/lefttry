        // --- 배경음악 설정 ---
        const bgmUrl = 'Data/music/2. On the island.mp3';
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
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '00', '--', '00', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '00', '00', '4A', '00', '00', '--', '00', '--', '00', '1P', '--', '--', '--', '--', '4B', '--', '--', '--', '--', '--'],
                    ['--', '--', '00', '--', '2W', '00', '--', '00', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '00', '--', '--', '--', '--', '00', '--', '--', '--', '--', '--', '--', '1F', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '2W', '1F', '2W', '00', '00', '00', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
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
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '2F', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '3A', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '3A', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '3A', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '00', '00', '00', '00', '00', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '00', '--', '--', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '00', '--', '1P', '--', '00', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '00', '--', '--', '--', '1W', '--', '--', '--', '--', '--', '--', '--', '--'],
                    ['--', '--', '--', '--', '--', '--', '--', '--', '00', '00', '00', '00', '00', '--', '--', '--', '--', '--', '--', '--', '--']
                ],
                tooltip: [
                    'P-1 Stage.',
                    'Test A, B'
                ]
            },
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
                    '바뀌는 순서는 초록 > 노랑 > 빨강 순서입니다.'
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
                    ['00', '--', '--', '--', '--', '--', '--', '--', '--', '00'],
                    ['00', '--', '00', '00', '00', '00', '00', '00', '--', '00'],
                    ['00', '--', '00', '00', '00', '00', '00', '00', '--', '00'],
                    ['00', '--', '--', '2F', '00', '00', '1P', '--', '--', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    'insert tooltip here', '(8, 2)2W 이동 로직 만들고 나면 넣기.'
                ],
                turnLimit: 20
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
                    ['00', '00', '--', '--', '--', '--', '--', '--', '--', '00'],
                    ['00', '00', '--', '00', '00', '00', '00', '00', '--', '00'],
                    ['00', '00', '--', '--', '--', '--', '3F', '00', '3A', '00'],
                    ['00', '00', '00', '00', '00', '00', '--', '00', '00', '00'],
                    ['00', '--', '--', '--', '--', '1P', '--', '--', '--', '00'],
                    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
                ],
                tooltip: [
                    'insert tooltip here', '(5,3) 4W, 3A의 어그로 이동 로직 만들고 나면 넣기'
                ],
                turnLimit: 30
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
// [개선] 모든 핵심 상태를 하나의 객체에서 관리합니다.
let gameState = {};

function setupInitialState(stageIndex = 0) {
    gameState = {
        currentStageIndex: stageIndex,
        turnCount: 0,
        nextObjectId: 1,
        selectedId: null,
        objects: [],
        history: [],
        tooltipOverride: null,
        flowState: 'playing', // 'playing', 'won', 'lost'
    };
}

        const grid = document.getElementById('grid');
        const message = document.getElementById('message');
        const tooltip = document.getElementById('tooltip');
        const stageDisplay = document.getElementById('stage-display');
        const clearMessage = document.getElementById('clear-message');
        const turnDisplay = document.getElementById('turn-display');
        const MAX_HISTORY = 256;
        const preloadedImagesCache = {}; // [신규] 프리로드된 이미지 객체를 저장할 전용 캐시

        // [신규] AI 이동 유효성 검사 헬퍼 함수
// [교체] isMoveValid 함수 (gameState 참조하도록 수정)
function isMoveValid(row, col) {
    // [수정] 전역 변수 대신 gameState에서 현재 스테이지 정보를 가져옵니다.
    const stage = stages[gameState.currentStageIndex];
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
// [교체] processEnemyNearRange 함수 (A* 호출 시 gameState 참조하도록 수정)
function processEnemyNearRange(obj) {
    // ... 함수의 다른 부분은 v0.14b와 동일 ...
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
        } else {
            obj.isTracking = false;
            return;
        }
    }

    // 3. "끈질긴 추적" 실행
    if (obj.isTracking && currentTarget) {
        // 3.1. 공격
        if (Math.abs(currentTarget.row - obj.row) <= 1 && Math.abs(currentTarget.col - obj.col) <= 1) {
            gameState.objects = gameState.objects.filter(o => o.id !== currentTarget.id);
            createAttackEffect(currentTarget.row, currentTarget.col, 'near', obj.color);
            obj.targetId = null;
            obj.isTracking = false;
            if (currentTarget.id === gameState.selectedId) {
                const newSelection = gameState.objects.find(o => o.color === 'green' && o.type !== 'F') || null;
                gameState.selectedId = newSelection ? newSelection.id : null;
            }
            return;
        }

        // 3.2. 이동 결정 (하이브리드 방식)
        let bestMove = null;

        // [수정] A* 경로 탐색 시 gameState에서 현재 맵 데이터를 가져옵니다.
        const path = findPathAStar(obj.row, obj.col, currentTarget.row, currentTarget.col, stages[gameState.currentStageIndex].map);
        if (path && path.length > 1) {
            bestMove = { r: path[1].row, c: path[1].col };
        } else {
            // ... (이하 돌격병 로직은 v0.14b와 동일)
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
                let bestCandidates = possibleMoves.filter(m => m.dist < currentDist);

                if (bestCandidates.length > 0) {
                    const minXDist = Math.min(...bestCandidates.map(m => Math.abs(m.c - currentTarget.col)));
                    bestCandidates = bestCandidates.filter(m => Math.abs(m.c - currentTarget.col) === minXDist);
                    
                    if (bestCandidates.length > 1) {
                        const minYDist = Math.min(...bestCandidates.map(m => Math.abs(m.r - currentTarget.row)));
                        bestCandidates = bestCandidates.filter(m => Math.abs(m.r - currentTarget.row) === minYDist);
                    }
                    
                    bestMove = bestCandidates[0];
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
    // [개선] setupInitialState를 호출하여 게임 상태를 깨끗하게 리셋합니다.
    setupInitialState(gameState.currentStageIndex);
    
    const stage = stages[gameState.currentStageIndex];
    
    // 객체 생성 로직 (v0.14b와 동일, gameState 참조만 수정)
    for (let row = 0; row < stage.map.length; row++) {
        for (let col = 0; col < stage.map[0].length; col++) {
            const code = stage.map[row][col];
            if (code !== '00' && code !== '--') {
                const type = code.charAt(1);
                const colorNumber = parseInt(code.charAt(0));
                let color;
                switch(colorNumber) {
                    case 1: color = 'green'; break;
                    case 2: color = 'yellow'; break;
                    case 3: color = 'red'; break;
                    case 4: color = 'blue'; break;
                }
                const newObj = {
                    id: gameState.nextObjectId++,
                    row: row, col: col, type: type, color: color, code: code,
                    targetId: null, isTracking: false, turnsSinceRecognition: 0,
                    spriteState: 'a', direction: 'B'
                };
                if (!['P', 'A', 'B'].includes(type)) {
                    delete newObj.spriteState;
                    delete newObj.direction;
                }
                gameState.objects.push(newObj);
            }
        }
    }

    const player = gameState.objects.find(o => o.type === 'P' && o.color === 'green');
    if (player) {
        gameState.selectedId = player.id;
    }
    
    addHistory('load', {}); // [개선] 상태 저장 로직 간소화
    renderMap();
}


// [교체 대상] renderMap 함수
// [교체] renderMap 함수 (전용 캐시에서 이미지 복제하여 사용)
// [교체] renderMap 함수 (캐시에서 imageKey로 직접 조회)
// [교체] renderMap 함수 (gameState 참조하도록 수정)
function renderMap() {
    // [수정] 전역 변수 대신 gameState에서 현재 스테이지 정보를 가져옵니다.
    const stage = stages[gameState.currentStageIndex];
    
    grid.style.gridTemplateColumns = `repeat(${stage.map[0].length}, calc(40px * 1.25))`;
    grid.style.gridTemplateRows = `repeat(${stage.map.length}, calc(40px * 1.25))`;
    grid.innerHTML = '';

    for (let row = 0; row < stage.map.length; row++) {
        for (let col = 0; col < stage.map[0].length; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add(stage.map[row][col] === '00' ? 'empty' : 'floor');
            
            // [수정] gameState.objects를 참조합니다.
            const objsOnTile = gameState.objects.filter(o => o.row === row && o.col === col);
            
            // ... (이하 로직은 v0.14b와 동일)
            objsOnTile.sort((a, b) => {
                const zA = a.type === 'P' ? 10 : 5;
                const zB = b.type === 'P' ? 10 : 5;
                return zA - zB;
            });

            if (objsOnTile.length > 0) {
                objsOnTile.forEach(obj => {
                    const objCode = `${obj.color === 'green' ? '1' : obj.color === 'yellow' ? '2' : obj.color === 'red' ? '3' : '4'}${obj.type}`;
                    let imageKey = objCode;

                    if (['P', 'A', 'B'].includes(obj.type)) {
                        if (!obj.spriteState) obj.spriteState = 'a';
                        if (!obj.direction) obj.direction = 'B';
                        imageKey = `${objCode}_${obj.spriteState}${obj.direction}`;
                    }
                    
                    const cachedImage = preloadedImagesCache[imageKey];
                    if (cachedImage && cachedImage.complete) {
                        const img = cachedImage.cloneNode(true);
                        img.alt = obj.type;
                        img.classList.add('object-sprite');
                        if(obj.type === 'P') img.classList.add('player-sprite');
                        tile.appendChild(img);
                    } else {
                        // ... (폴백 로직 동일)
                    }
                    
                    if (obj.isTracking && (obj.type === 'A' || obj.type === 'B') && (obj.color === 'red' || obj.color === 'blue')) {
                        tile.classList.add('tracking');
                    }
                    // [수정] gameState.selectedId를 참조합니다.
                    if (gameState.selectedId && gameState.selectedId === obj.id) {
                        tile.style.border = '2px solid #fff';
                    }
                });
            }

            tile.dataset.row = row;
            tile.dataset.col = col;
            grid.appendChild(tile);
        }
    }

    // [수정] gameState.flowState를 참조합니다.
    if (gameState.flowState === 'lost') {
        message.textContent = 'Z: 한 칸 되돌리기, R: 스테이지 초기화 하기';
    } else {
        message.textContent = '';
    }
    
    // [수정] gameState.currentStageIndex를 참조합니다.
    stageDisplay.textContent = `Stage: ${gameState.currentStageIndex + 1}`;
    updateTurnDisplay();
    // [수정] gameState.tooltipOverride를 참조합니다.
    const tooltipText = gameState.tooltipOverride ? [gameState.tooltipOverride] : stage.tooltip;
    tooltip.innerHTML = tooltipText.map(line => `<span>${line}</span>`).join('');
    renderExternalLinkButton(stage);
}



// [교체] updateTurnDisplay 함수 (gameState 참조하도록 수정)
function updateTurnDisplay() {
    const turnDisplay = document.getElementById('turn-display');
    if (!turnDisplay) return;
    
    // [수정] gameState에서 스테이지와 턴 카운트 정보를 가져옵니다.
    const stage = stages[gameState.currentStageIndex];
    
    if (stage.turnLimit && stage.turnLimit > 0) {
        const remainingTurns = stage.turnLimit - gameState.turnCount;
        let displayText = `Turn: ${gameState.turnCount}/${stage.turnLimit} (남은 턴: ${remainingTurns})`;
        
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

// [교체] canMove 함수 (gameState 참조하도록 수정)
function canMove(row, col, movingObj) {
    // [수정] 전역 변수 대신 gameState에서 현재 스테이지 정보를 가져옵니다.
    const stage = stages[gameState.currentStageIndex];
    if (row < 0 || row >= stage.map.length || col < 0 || col >= stage.map[0].length || stage.map[row][col] === '00') {
        return false;
    }
    const obj = gameState.objects.find(o => o.row === row && o.col === col);
    if (obj) {
        // 승리 조건인 경우에만 겹칠 수 있음
        return obj.type === 'F' && obj.color === 'yellow' && movingObj.type === 'P' && movingObj.color === 'green';
    }
    return true;
}

        // [교체] addHistory 함수
function addHistory(action, data) {
    // [개선] gameState 전체를 저장하여 되돌리기 기능의 안정성을 확보합니다.
    const stateSnapshot = JSON.parse(JSON.stringify(gameState));
    stateSnapshot.history = []; // 히스토리 내의 히스토리는 저장하지 않습니다.
    
    gameState.history.push({
        action: action,
        data: data,
        state: stateSnapshot
    });

    if (gameState.history.length > MAX_HISTORY) {
        gameState.history.shift();
    }
}

        

// [신규] 모든 게임 종료 조건을 순서대로 판정하는 중앙 함수
// [교체] checkGameEndConditions 함수
function checkGameEndConditions() {
    // 게임이 이미 끝나있다면, 추가 판정을 하지 않음
    if (gameState.flowState !== 'playing') return true;

    // 1. 승리 조건 판정 (가장 먼저)
    const player = gameState.objects.find(o => o.type === 'P' && o.color === 'green');
    const victoryTile = gameState.objects.find(o => o.type === 'F' && o.color === 'yellow');
    if (player && victoryTile && player.row === victoryTile.row && player.col === victoryTile.col) {
        gameState.flowState = 'won';
        const stage = stages[gameState.currentStageIndex];
        clearMessage.textContent = stage.clearMessage || 'Clear!';
        clearMessage.style.display = 'block';
        clearMessage.classList.add('fade-in-out');

        setTimeout(() => {
            clearMessage.style.display = 'none';
            clearMessage.classList.remove('fade-in-out');
            gameState.currentStageIndex = (gameState.currentStageIndex + 1) % stages.length;
            loadStage();
        }, 2000);
        return true; // 게임 흐름 종료
    }

    // 2. [신규] 턴 제한 초과 시 '도착점 제거 이벤트' 발생
    const stage = stages[gameState.currentStageIndex];
    if (stage.turnLimit && stage.turnLimit > 0 && gameState.turnCount >= stage.turnLimit) {
        // 도착점이 아직 남아있을 때만 제거 로직 실행 (중복 실행 방지)
        const arrivalPoints = gameState.objects.filter(o => o.type === 'F');
        if (arrivalPoints.length > 0) {
            // 히스토리에 제거될 객체들을 기록 (되돌리기를 위해)
            addHistory('turnLimitRemove', { removed: arrivalPoints });
            // F타입이 아닌 객체들만 남김
            gameState.objects = gameState.objects.filter(o => o.type !== 'F');
            gameState.tooltipOverride = '턴 제한 초과! 모든 도착점이 파괴됩니다...';
            // 즉시 렌더링하여 도착점이 사라지는 것을 보여줌
            renderMap(); 
        }
    }
    
    // 3. 최종 패배 조건 판정: 도착점이 하나도 없는가?
    // (턴 제한으로 제거되었든, 플레이어가 제거했든 이 조건 하나로 모든 패배를 처리)
    if (gameState.objects.filter(o => o.type === 'F').length === 0) {
        gameState.flowState = 'lost';
        // 턴 제한으로 패배한 경우, 툴팁이 이미 설정되어 있으므로 유지
        if (!gameState.tooltipOverride) {
            gameState.tooltipOverride = '도착점이 사라졌습니다! R을 눌러 재시작하세요.';
        }
        return true; // 게임 흐름 종료
    }

    return false; // 게임 계속 진행
}



// [교체 대상] advanceTurn 함수
// advanceTurn 함수 상단의 gameOver 체크를 gameFlowState 체크로 변경
function advanceTurn() {
    if (gameState.flowState !== 'playing') return;

    gameState.turnCount++;
    addHistory('turnEnd', {});

    gameState.objects.forEach(obj => {
        if ((obj.type === 'A') && (obj.color === 'red' || obj.color === 'blue')) {
            processEnemyNearRange(obj);
        } else if ((obj.type === 'B') && (obj.color === 'red' || obj.color === 'blue')) {
            processEnemyLongRange(obj);
        }
    });

    const isGameEnded = checkGameEndConditions();
    
    renderMap(); // [개선] 게임 종료 여부와 관계없이 항상 최종 상태를 렌더링
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
// [교체] document.addEventListener('keydown', ...) 이벤트 리스너 (v0.15a - 되돌리기 버그 수정)
document.addEventListener('keydown', (e) => {
    if (bgmLoaded && bgm.paused) {
        bgm.play().catch(err => console.warn('BGM 재생 실패:', err));
    }

    if (gameState.flowState === 'won') {
        return;
    }

    const key = e.key.toLowerCase();

    if (key === 'r') {
        // [수정] loadStage 호출 시 gameState.currentStageIndex를 명시적으로 전달
        loadStage(gameState.currentStageIndex);
        return;
    }
    
    if (key === 'z') {
        if (gameState.history.length > 1) {
            // [핵심 수정] 되돌리기 로직 개선
            // 1. 현재의 전체 히스토리 목록을 임시로 보관합니다.
            const fullHistory = gameState.history;
            
            // 2. 마지막 상태(현재 상태)를 목록에서 제거합니다.
            fullHistory.pop();
            
            // 3. 되돌아갈 과거의 상태 스냅샷을 가져옵니다.
            const restoredStateSnapshot = fullHistory[fullHistory.length - 1].state;
            
            // 4. 게임 상태를 과거 스냅샷으로 완전히 복원합니다.
            gameState = JSON.parse(JSON.stringify(restoredStateSnapshot));
            
            // 5. [중요] 복원된 gameState의 짧아진 히스토리를
            //    보관해두었던 완전한 히스토리 목록으로 다시 덮어씌웁니다.
            gameState.history = fullHistory;

            renderMap();
        }
        return;
    }
    
    if (gameState.flowState === 'lost') {
        return;
    }

    let actionTaken = false;
    const selectedObj = gameState.objects.find(o => o.id === gameState.selectedId);

    if (['w', 's', 'a', 'd'].includes(key)) {
        if (!selectedObj || selectedObj.color !== 'green' || selectedObj.type === 'F') return;
        const newPos = { row: selectedObj.row, col: selectedObj.col };
        if (key === 'w') newPos.row--;
        else if (key === 's') newPos.row++;
        else if (key === 'a') newPos.col--;
        else if (key === 'd') newPos.col++;

        if (canMove(newPos.row, newPos.col, selectedObj)) {
            selectedObj.row = newPos.row;
            selectedObj.col = newPos.col;
            updateSprite(selectedObj, 'move', key);
            actionTaken = true;
        }
    }
    else if (key === ' ') {
        e.preventDefault();
        const leftmost = findLeftmost();
        if (leftmost && leftmost.color === 'blue') {
            message.textContent = '파란색 물체로 인해 규칙이 막혔습니다';
            setTimeout(() => message.textContent = '', 2000);
            return;
        }
        if (leftmost) {
            gameState.objects = gameState.objects.filter(o => o.id !== leftmost.id);
            if (leftmost.id === gameState.selectedId) {
                const newSelection = gameState.objects.find(o => o.color === 'green' && o.type !== 'F') || null;
                gameState.selectedId = newSelection ? newSelection.id : null;
            }
            actionTaken = true;
        }
    }
    else if (key === 'tab') {
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
            if (currentIndex !== -1) {
                const nextColor = colors[(currentIndex + 1) % 3];
                leftmost.color = nextColor;
                actionTaken = true;
            }
        }
    }
     else if (key === 'q') {
        actionTaken = true;
    }

    if (actionTaken) {
        advanceTurn();
    }
});




        // 마우스 클릭 이벤트 리스너
// 마우스 클릭 이벤트 리스너도 gameFlowState 체크 추가
// [교체] grid.addEventListener('click', ...) 이벤트 리스너 (gameState 참조하도록 수정)
grid.addEventListener('click', (e) => {
    // [수정] gameState.flowState를 참조합니다.
    if (gameState.flowState !== 'playing') return;

    const tile = e.target.closest('.tile');
    if (!tile) return;
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);
    const clickedObj = gameState.objects.find(o => o.row === row && o.col === col);

    // 초록색 오브젝트 선택
    if (clickedObj && clickedObj.color === 'green' && clickedObj.type !== 'F') {
        // [수정] gameState.selectedId를 업데이트합니다.
        gameState.selectedId = clickedObj.id;
        renderMap();
        return;
    }

    // 공격 처리
    // [수정] gameState.selectedId를 이용해 선택된 객체를 찾습니다.
    const selectedObj = gameState.objects.find(o => o.id === gameState.selectedId);
    if (selectedObj && selectedObj.color === 'green' && (selectedObj.type === 'A' || selectedObj.type === 'B')) {
        const range = selectedObj.type === 'A' ? 1 : 3;
        if (Math.abs(row - selectedObj.row) <= range && Math.abs(col - selectedObj.col) <= range) {
            const target = gameState.objects.find(o => o.row === row && o.col === col && o.type !== 'I' && o.type !== 'F');
            if (target) {
                gameState.objects = gameState.objects.filter(o => o.id !== target.id);
                createAttackEffect(row, col, selectedObj.type === 'A' ? 'near' : 'far', 'green');
                
                if (target.id === gameState.selectedId) {
                    const newSelection = gameState.objects.find(o => o.color === 'green' && o.type !== 'F') || null;
                    gameState.selectedId = newSelection ? newSelection.id : null;
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
    // [개선] setupInitialState를 먼저 호출하여 gameState를 생성합니다.
    setupInitialState(0);
    loadStage();
}

main();
