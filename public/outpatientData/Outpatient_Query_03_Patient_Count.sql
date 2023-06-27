-- 1. 서울대병원 전체 환자 수
SELECT COUNT(DISTINCT PT_NO) 
FROM LT_CRE_PT
--WHERE FST_HME_DT IS NOT NULL 
;
-- 2. 서울대병원 본원 전체 환자 수 
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD = '1'
;

-- 3. 서울대병원 어린이 전체 환자 수
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD = '2'
;

-- 4. 서울대병원 암병원 전체 환자 수
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD = 'G'
;

-- 5. 서울대병원 강남 전체 환자 수
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD IN ( 'C', 'D')
;
