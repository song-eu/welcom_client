-- 1. ����뺴�� ��ü ȯ�� ��
SELECT COUNT(DISTINCT PT_NO) 
FROM LT_CRE_PT
--WHERE FST_HME_DT IS NOT NULL 
;
-- 2. ����뺴�� ���� ��ü ȯ�� �� 
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD = '1'
;

-- 3. ����뺴�� ��� ��ü ȯ�� ��
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD = '2'
;

-- 4. ����뺴�� �Ϻ��� ��ü ȯ�� ��
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD = 'G'
;

-- 5. ����뺴�� ���� ��ü ȯ�� ��
SELECT count(DISTINCT PT_NO)
FROM FT_CRE_VIST
WHERE 1=1 
--AND MED_YN = 'Y' 
AND HSP_DTL_TP_CD IN ( 'C', 'D')
;
