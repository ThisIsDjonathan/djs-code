-- 12. Crie um script para selecionar todos os lançamentos que possuam mais que 10 itens e alterar a observação dos
-- lançamentos selecionados anteriormente concatenando a observação atual com a seguinte texto ("- Possuem mais que 10 itens").

-- Lançamento com mais de 10 itens
SELECT lancamento.oid id_lancamento, COUNT(lancamentoitem.oid_item) qtd_itens
FROM lancamentoitem 
	INNER JOIN lancamento 
		ON lancamento.oid = lancamentoitem.oid_lancamento
	INNER JOIN item 
		ON item.oid = lancamentoitem.oid_item
GROUP BY lancamento.oid		
HAVING COUNT (lancamentoitem.oid_item) > 10;

-- Atualização da observação do lançamento 
UPDATE lancamento
SET observacao = observacao || ' - Possuem mais que 10 itens'
WHERE oid in (SELECT lancamento.oid id_lancamento
				FROM lancamentoitem 
					INNER JOIN lancamento 
						ON lancamento.oid = lancamentoitem.oid_lancamento
					INNER JOIN item 
						ON item.oid = lancamentoitem.oid_item
				GROUP BY lancamento.oid		
				HAVING COUNT (lancamentoitem.oid_item) > 10);

