create or replace function get_user_balance (uid UUID)
returns table (
	earnings numeric (10,2),
	expenses numeric (10,2),
	balance numeric (10,2)
) as $$
begin 
	return query
	select 
		sum (t1.earning) as earnings,
		sum (t1.expense) as expenses,
		sum(t1.earning) - sum(t1.expense) as balance
	from (
		select 
			t.user_id,
			(
				case 
					when type = 'EARNING' then t.amount
					else 0
				end
			) as earning,
			(
				case 
					when type = 'EXPENSE' then t.amount
					else 0
				end
			) as expense
		from transactions t 
		where t.user_id = uid
	) as t1;
end; $$
language plpgsql;